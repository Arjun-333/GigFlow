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
  if (!gig) return <p className="text-center text-gray-500 mt-10 text-lg">Gig not found</p>;

  const isOwner = user && gig.ownerId._id === user._id;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Gig Header Card */}
      <div className="bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-2xl overflow-hidden mb-10">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
             <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{gig.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-base text-gray-500">
                    <span className="flex items-center hover:text-indigo-600 transition-colors"><FiUser className="mr-2"/> {gig.ownerId.name}</span>
                    <span className="flex items-center"><FiClock className="mr-2"/> Posted {new Date(gig.createdAt).toLocaleDateString()}</span>
                </div>
             </div>
             <div className="flex items-center">
                 <span className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase ${
                      gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {gig.status}
                  </span>
             </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-4">
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Project Details</h3>
                   <div className="prose prose-indigo text-gray-600 max-w-none leading-relaxed">
                     <p className="whitespace-pre-line text-lg">{gig.description}</p>
                   </div>
                </div>
                <div className="bg-gray-50/80 rounded-2xl p-8 h-fit border border-gray-100/50">
                   <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Budget</h3>
                   <p className="text-4xl font-extrabold text-indigo-600 flex items-center tracking-tight">
                      <FiDollarSign className="mr-1" size={28} />{gig.budget.toLocaleString()}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Place Bid Section */}
      {!isOwner && user && gig.status === 'open' && (
        <div className="bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-2xl overflow-hidden mb-10">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
             <h3 className="text-xl font-bold text-gray-900">Submit a Proposal</h3>
          </div>
          <div className="p-8 sm:p-10">
            <form onSubmit={handlePlaceBid} className="space-y-8">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Bid Amount ($)</label>
                <div className="relative rounded-xl shadow-sm max-w-xs">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <span className="text-gray-500 text-lg">$</span>
                   </div>
                   <input
                    type="number"
                    required
                    className="focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 block w-full pl-9 pr-12 text-base border-gray-200 rounded-xl py-3.5 transition-all duration-200"
                    placeholder="0.00"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">Cover Letter</label>
                <div className="mt-1">
                  <textarea
                    required
                    rows={6}
                    className="shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 block w-full text-base border-gray-200 rounded-xl p-4 transition-all duration-200"
                    placeholder="Describe why you're the best fit..."
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-3.5 px-8 border border-transparent shadow-lg shadow-indigo-500/30 text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Submit Proposal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Login Prompt */}
      {!user && gig.status === 'open' && (
         <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
            <p className="text-indigo-900 text-lg">Interested in this gig? <a href="/login" className="font-bold underline hover:text-indigo-800">Log in</a> to place a bid.</p>
         </div>
      )}

      {/* Owner View - Bids */}
      {isOwner && (
        <div className="bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <h3 className="text-xl font-bold text-gray-900">Proposals ({bids.length})</h3>
          </div>
          {bids.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-lg">
               No proposals received yet.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {bids.map((bid) => (
                <li key={bid._id} className="p-8 hover:bg-gray-50/50 transition-colors duration-150">
                  <div className="flex flex-col sm:flex-row gap-6 justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                        <span className="text-lg font-bold text-gray-900">{bid.freelancerId.name}</span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                           <FiDollarSign className="mr-0.5" size={12}/>{bid.price}
                        </span>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed">{bid.message}</p>
                      
                       <div className="pt-2">
                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
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
                            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
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
