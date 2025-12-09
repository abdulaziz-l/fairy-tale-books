import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Lock, Key, Sparkles } from 'lucide-react';
import api from '../services/api';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast.error('Please enter the admin password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.adminLogin({ password });
      
      if (response.data.success) {
        // Store admin token (in a real app, use secure storage)
        localStorage.setItem('adminToken', response.data.token);
        toast.success('Welcome to the admin panel! ✨');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Invalid password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-magic-gradient flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="story-card p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-lavender/20 rounded-full mb-4"
            >
              <Lock className="h-8 w-8 text-story-purple" />
            </motion.div>
            
            <h1 className="font-display text-3xl font-bold text-gradient mb-2">
              Admin Access
            </h1>
            <p className="story-text text-warm-brown/70">
              Enter the magical password to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-warm-brown mb-2">
                <Key className="inline h-4 w-4 mr-1" />
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="magic-input"
                placeholder="Enter admin password"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full magic-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-warm-brown border-t-transparent"></div>
                  <span>Unlocking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Access Admin Panel</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-story-purple hover:text-magic-pink transition-colors duration-300 story-text">
              ← Back to Home
            </Link>
          </div>
        </motion.div>

        {/* Demo Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="story-text text-sm text-warm-brown/60">
            Demo Password: <code className="bg-white/50 px-2 py-1 rounded">admin123</code>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;