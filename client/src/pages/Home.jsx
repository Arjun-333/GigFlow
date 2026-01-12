import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content Area */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-200 bg-white/30 backdrop-blur-sm shadow-sm mb-6 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 mr-2"></span>
              <span className="text-sm font-medium text-purple-900">The Future of Freelancing</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight animate-fade-in-up delay-100">
              Connect with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                World-Class Talent
              </span>
            </h1>
            
            <p className="mt-4 text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
              Find the perfect freelance services for your business. From design to development, GigFlow connects you with experts who deliver results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <Link
                to="/gigs"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200 shadow-lg shadow-indigo-500/30"
              >
                Find Work
                <svg className="ml-2 -mr-1 w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-50 text-lg font-bold rounded-xl text-indigo-700 bg-white/60 hover:bg-white/90 backdrop-blur-sm transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 shadow-sm"
              >
                Hire Talent
              </Link>
            </div>
            
            <div className="mt-10 animate-fade-in-up delay-300">
               <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Trusted by industry leaders</p>
               <div className="flex items-center justify-center lg:justify-start gap-8 opacity-70 transition-all duration-500">
                  <span className="text-xl font-bold text-slate-400 flex items-center gap-2 hover:text-indigo-600 transition-colors"><span className="text-2xl text-slate-400 group-hover:text-indigo-600">❖</span> TechStart</span>
                  <span className="text-xl font-bold text-slate-400 flex items-center gap-2 hover:text-purple-600 transition-colors"><span className="text-2xl text-slate-400 group-hover:text-purple-600">⚡</span> FastGig</span>
                  <span className="text-xl font-bold text-slate-400 flex items-center gap-2 hover:text-pink-600 transition-colors"><span className="text-2xl text-slate-400 group-hover:text-pink-600">∞</span> LoopInc</span>
               </div>
            </div>
          </div>

          {/* Right Visual Area - Glassmorphism Card */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full blur-[100px] opacity-40"></div>
            <div className="relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Web Development</h3>
                    <p className="text-purple-600 font-medium">Starting at $500</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl">💻</span>
                  </div>
               </div>
               
               <div className="space-y-4">
                 <div className="flex items-center p-3 bg-white/60 rounded-xl">
                   <div className="h-10 w-10 rounded-full bg-indigo-100 mr-3"></div>
                   <div>
                     <div className="h-2 w-32 bg-gray-200 rounded mb-1"></div>
                     <div className="h-2 w-20 bg-gray-200 rounded"></div>
                   </div>
                 </div>
                 <div className="flex items-center p-3 bg-white/60 rounded-xl">
                    <div className="h-10 w-10 rounded-full bg-pink-100 mr-3"></div>
                    <div>
                      <div className="h-2 w-28 bg-gray-200 rounded mb-1"></div>
                      <div className="h-2 w-16 bg-gray-200 rounded"></div>
                    </div>
                 </div>
               </div>
               
               <div className="mt-8">
                 <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium">
                   View Details
                 </button>
               </div>
            </div>
            
            {/* Float Element */}
             <div className="absolute -bottom-10 -left-10 bg-white/60 backdrop-blur-lg border border-white/60 p-4 rounded-2xl shadow-xl animate-bounce">
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                     <div className="h-8 w-8 rounded-full bg-yellow-200 border-2 border-white"></div>
                     <div className="h-8 w-8 rounded-full bg-green-200 border-2 border-white"></div>
                     <div className="h-8 w-8 rounded-full bg-blue-200 border-2 border-white"></div>
                   </div>
                   <div>
                     <p className="text-xs font-bold text-gray-800">1k+ Freelancers</p>
                     <p className="text-[10px] text-gray-500">Joined this week</p>
                   </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default Home;
