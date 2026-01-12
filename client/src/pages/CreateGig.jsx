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
    <div className="min-h-[80vh] flex items-start justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Post a New Gig</h1>
            <p className="mt-2 text-gray-600">Provide details about your project to start receiving proposals.</p>
         </div>
        
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
           <div className="px-6 py-8 sm:px-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 px-3"
                    placeholder="e.g. Build a Responsive Portfolio Website"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={6}
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                    placeholder="Detailed description of the deliverables and requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-gray-500">Be specific about what you need to avoid misunderstandings.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                   <div className="relative rounded-md shadow-sm max-w-xs">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <span className="text-gray-500 sm:text-sm">$</span>
                     </div>
                     <input
                      type="number"
                      required
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-lg py-2.5"
                      placeholder="0.00"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
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
