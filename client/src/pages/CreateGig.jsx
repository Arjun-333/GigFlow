import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const CreateGig = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
        navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/gigs', { title, description, budget });
      navigate('/gigs');
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating gig');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-start justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-3xl w-full">
         <div className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Post a New Gig</h1>
            <p className="mt-3 text-lg text-gray-600">Provide details about your project to start receiving proposals.</p>
         </div>
        
        <div className="bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-2xl overflow-hidden">
           <div className="p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Project Title</label>
                  <input
                    type="text"
                    required
                    className="block w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base py-3.5 px-4 transition-all duration-200"
                    placeholder="e.g. Build a Responsive Portfolio Website"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Description</label>
                  <textarea
                    required
                    rows={8}
                    className="block w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base p-4 transition-all duration-200"
                    placeholder="Detailed description of the deliverables and requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="mt-3 text-sm text-gray-500">Be specific about what you need to avoid misunderstandings.</p>
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">Budget ($)</label>
                   <div className="relative rounded-xl shadow-sm max-w-sm">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <span className="text-gray-500 text-lg">$</span>
                     </div>
                     <input
                      type="number"
                      required
                      className="focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 block w-full pl-9 pr-12 text-base border-gray-200 rounded-xl py-3.5 transition-all duration-200"
                      placeholder="0.00"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Publish Gig
                    </button>
                </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;
