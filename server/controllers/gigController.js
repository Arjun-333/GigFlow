import Gig from '../models/Gig.js';

export const createGig = async (req, res) => {
  const { title, description, budget } = req.body;

  try {
    const gig = new Gig({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    const createdGig = await gig.save();
    res.status(201).json(createdGig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGigs = async (req, res) => {
  const keyword = req.query.search
    ? {
        title: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {};

  try {
    const gigs = await Gig.find({ ...keyword, status: 'open' }).populate('ownerId', 'name email').sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');
    if (gig) {
      res.json(gig);
    } else {
      res.status(404).json({ message: 'Gig not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
