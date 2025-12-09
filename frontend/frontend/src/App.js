import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import SuccessPage from './pages/SuccessPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream">
        <Navigation />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<UploadPage />} />
            <Route path="/success/:orderId" element={<SuccessPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </motion.main>

        <Footer />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fdf3e7',
              color: '#8b4513',
              border: '2px solid #c4b5fd',
              borderRadius: '12px',
            },
          }}
        />
        
        {/* Magical floating elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-lavender rounded-full twinkle-star opacity-30"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-mint rounded-full twinkle-star opacity-40"></div>
          <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-peach rounded-full twinkle-star opacity-25"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-lavender rounded-full twinkle-star opacity-50"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;