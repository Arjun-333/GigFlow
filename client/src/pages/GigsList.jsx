import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiSearch, FiDollarSign, FiClock, FiUser } from 'react-icons/fi';

const GigsList = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async (keyword = '') => {
    try {
      const { data } = await axios.get(`/api/gigs?search=${keyword}`);
      setGigs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs(search);
  };

  return (
    <div className="pt-32 pb-12 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Gigs</span>
          </h1>
          <p className="text-lg text-gray-500">Find the perfect project or hire top talent.</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex w-full md:w-auto">
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-24 text-base border-gray-200 rounded-xl py-3 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:shadow-md"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
               type="submit"
               className="absolute inset-y-1 right-1 px-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500 text-sm transition-all shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : gigs.length === 0 ? (
        <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg">
           <div className="mx-auto h-24 w-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
             <FiSearch className="h-10 w-10 text-purple-400" />
           </div>
           <h3 className="mt-2 text-xl font-bold text-gray-900">No gigs found</h3>
           <p className="mt-2 text-gray-500 max-w-md mx-auto">We couldn't find any gigs matching your search. Try adjusting your terms or check back later.</p>
           <button onClick={() => {setSearch(''); fetchGigs('');}} className="mt-6 text-purple-600 font-medium hover:text-purple-800 hover:underline">
             Clear search
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <div key={gig._id} className="bg-white/70 backdrop-blur-sm flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 border border-white/50 rounded-2xl transition-all duration-300 group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0 pr-4">
                     <h3 className="text-xl font-bold text-gray-900 truncate tracking-tight group-hover:text-purple-700 transition-colors">{gig.title}</h3>
                     <p className="mt-2 flex items-center text-sm text-gray-500">
                       <FiUser className="mr-1.5 text-purple-400" /> {gig.ownerId?.name || 'Unknown'}
                     </p>
                  </div>
                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      gig.status === 'open' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {gig.status}
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed text-sm">{gig.description}</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50/50 to-white px-6 py-4 flex items-center justify-between border-t border-purple-100/50">
                 <div className="flex items-center text-base font-bold text-gray-900">
                    <FiDollarSign className="mr-0.5 text-purple-500" />
                    {gig.budget.toLocaleString()}
                 </div>
                 <Link 
                    to={`/gigs/${gig._id}`} 
                    className="text-sm font-semibold text-purple-700 hover:text-purple-900 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors"
                 >
                    View Details →
                 </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GigsList;
