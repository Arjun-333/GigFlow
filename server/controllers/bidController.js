import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import mongoose from 'mongoose';

export const placeBid = async (req, res) => {
  const { gigId, message, price } = req.body;

  try {
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    if (gig.status !== 'open') return res.status(400).json({ message: 'Gig is not open' });

    // Check if user already bid
    const existingBid = await Bid.findOne({ gigId, freelancerId: req.user._id });
    if (existingBid) return res.status(400).json({ message: 'You have already bid on this gig' });

    const bid = new Bid({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    const createdBid = await bid.save();
    res.status(201).json(createdBid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBidsByGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    // Assuming only owner should see bids? Or all? Req says "Clients can view all bids for gigs they own".
    // Does not explicitly forbid others, but usually hidden. I'll stick to owner check for full list.
    if (gig.ownerId.toString() !== req.user._id.toString()) {
       return res.status(401).json({ message: 'Not authorized' });
    }

    const bids = await Bid.find({ gigId: req.params.gigId }).populate('freelancerId', 'name email');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hireBid = async (req, res) => {
  const { bidId } = req.params;
  const userId = req.user._id;

  // Start a MongoDB session for atomic transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(bidId).populate('gigId').session(session);
    if (!bid) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Bid not found' });
    }

    if (bid.gigId.ownerId.toString() !== userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ message: 'Not authorized to hire for this gig' });
    }

    // 1. ATOMIC LOCK: Try to update the Gig status from 'open' to 'assigned'.
    // If this fails (returns null), it means another transaction/request has already modified it.
    // This PREVENTS RACE CONDITIONS where two clients might hire different freelancers simultaneously.
    const updatedGig = await Gig.findOneAndUpdate(
      { _id: bid.gigId._id, status: 'open' },
      { status: 'assigned' },
      { new: true, session }
    );

    if (!updatedGig) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Gig is already assigned to someone else or is not open.' });
    }

    // 2. Update the selected bid status to 'hired'
    bid.status = 'hired';
    await bid.save({ session });

    // 3. Reject all OTHER bids for this gig
    await Bid.updateMany(
      { gigId: bid.gigId._id, _id: { $ne: bidId } },
      { status: 'rejected' },
      { session }
    );

    // Commit the transaction only if all steps succeed
    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Bid hired successfully', gig: updatedGig, bid });
  } catch (error) {
    // If any error occurs, abort everything so database remains consistent
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
