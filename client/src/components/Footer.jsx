import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-purple-100 mt-auto">
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <span className="text-2xl">⚡</span>
             <span className="text-xl font-bold text-gray-900 tracking-tight">GigFlow</span>
          </div>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 text-center md:text-left">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} GigFlow Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
