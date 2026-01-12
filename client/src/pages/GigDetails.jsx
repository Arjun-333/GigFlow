import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FiDollarSign, FiUser, FiCheckCircle, FiClock } from 'react-icons/fi';

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidMessage, setBidMessage] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGig();
  }, [id]);

  useEffect(() => {
    if (gig && user && gig.ownerId._id === user._id) {
      fetchBids();
    }
  }, [gig, user]);

  const fetchGig = async () => {
    try {
      const { data } = await axios.get(`/api/gigs/${id}`);
      setGig(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const { data } = await axios.get(`/api/bids/${id}`);
      setBids(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bids', {
        gigId: id,
        message: bidMessage,
        price: bidPrice,
      });
      alert('Bid placed successfully!');
      setBidMessage('');
      setBidPrice('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing bid');
    }
  };

  const handleHire = async (bidId) => {
    if (!window.confirm('Are you sure you want to hire this freelancer? This will reject all other bids.')) return;
    try {
      await axios.patch(`/api/bids/${bidId}/hire`);
      alert('Freelancer hired!');
      fetchGig(); // Refresh status
      fetchBids(); // Refresh bids status
    } catch (error) {
      alert(error.response?.data?.message || 'Error hiring freelancer');
    }
  };

  if (loading) return (
     <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
     </div>
  );
  if (!gig) return <p className="text-center text-gray-500 mt-10">Gig not found</p>;

  const isOwner = user && gig.ownerId._id === user._id;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Gig Header Card */}
      <div className="bg-white shadow-sm border border-gray-100 sm:rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
             <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{gig.title}</h1>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center"><FiUser className="mr-1.5"/> {gig.ownerId.name}</span>
                    <span className="flex items-center"><FiClock className="mr-1.5"/> Posted {new Date(gig.createdAt).toLocaleDateString()}</span>
                </div>
             </div>
             <div className="flex items-center">
                 <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
                      gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                  </span>
             </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                   <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Project Details</h3>
                   <div className="prose prose-sm text-gray-600 max-w-none">
                     <p className="whitespace-pre-line">{gig.description}</p>
                   </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 h-fit border border-gray-100">
                   <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Budget</h3>
                   <p className="text-3xl font-bold text-indigo-600 flex items-center">
                      <FiDollarSign className="mr-0.5" />{gig.budget.toLocaleString()}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Place Bid Section */}
      {!isOwner && user && gig.status === 'open' && (
        <div className="bg-white shadow-sm border border-gray-100 sm:rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
             <h3 className="text-lg font-medium text-gray-900">Submit a Proposal</h3>
          </div>
          <div className="px-6 py-6 sm:px-8">
            <form onSubmit={handlePlaceBid} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bid Amount ($)</label>
                <div className="mt-1 relative rounded-md shadow-sm max-w-xs">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <span className="text-gray-500 sm:text-sm">$</span>
                   </div>
                   <input
                    type="number"
                    required
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-lg py-2.5"
                    placeholder="0.00"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <div className="mt-1">
                  <textarea
                    required
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3"
                    placeholder="Describe why you're the best fit..."
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Proposal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Login Prompt */}
      {!user && gig.status === 'open' && (
         <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
            <p className="text-indigo-800">Interested in this gig? <a href="/login" className="font-bold underline hover:text-indigo-900">Log in</a> to place a bid.</p>
         </div>
      )}

      {/* Owner View - Bids */}
      {isOwner && (
        <div className="bg-white shadow-sm border border-gray-100 sm:rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
             <h3 className="text-lg font-medium text-gray-900">Proposals ({bids.length})</h3>
          </div>
          {bids.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
               No proposals received yet.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {bids.map((bid) => (
                <li key={bid._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                        <span className="text-base font-bold text-gray-900">{bid.freelancerId.name}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                           <FiDollarSign className="mr-0.5" size={12}/>{bid.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{bid.message}</p>
                      
                       <div className="pt-2">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                               bid.status === 'hired' ? 'bg-green-50 text-green-700 border-green-200' : 
                               bid.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                               'bg-yellow-50 text-yellow-700 border-yellow-200'
                           }`}>
                            {bid.status.toUpperCase()}
                           </span>
                       </div>
                    </div>
                    
                    <div className="flex items-start">
                        {gig.status === 'open' && bid.status === 'pending' && (
                           <button
                            onClick={() => handleHire(bid._id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FiCheckCircle className="mr-2" /> Hire Freelancer
                          </button>
                        )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GigDetails;
