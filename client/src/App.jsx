import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

// Pages (Placeholders for now)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GigsList from './pages/GigsList';
import CreateGig from './pages/CreateGig';
import GigDetails from './pages/GigDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/gigs" element={<GigsList />} />
              <Route path="/gigs/create" element={<CreateGig />} />
              <Route path="/gigs/:id" element={<GigDetails />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
