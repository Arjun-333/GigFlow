import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-purple-100 transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-600 tracking-tight">GigFlow</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/gigs" className="border-transparent text-gray-500 hover:text-purple-600 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium transition-colors duration-200">
                Browse Gigs
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/gigs/create" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Post a Gig
                </Link>
                 <span className="text-base font-medium text-gray-900 border px-3 py-1.5 rounded-full bg-gray-50">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors shadow-sm">
                  Be a Freelancer / Client
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
