import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create Book' },
    { path: '/admin/login', label: 'Admin' }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-lavender/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-2"
            >
              <BookOpen className="h-8 w-8 text-story-purple" />
              <span className="font-display text-xl font-bold text-gradient">
                Fairy Tale Books
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-story-purple'
                    : 'text-warm-brown hover:text-story-purple'
                }`}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-lavender/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
            <Link
              to="/create"
              className="magic-button flex items-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Start Creating</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-warm-brown hover:text-story-purple transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-lavender/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'bg-lavender/20 text-story-purple'
                    : 'text-warm-brown hover:bg-lavender/10 hover:text-story-purple'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Link
                to="/create"
                onClick={() => setIsOpen(false)}
                className="magic-button w-full flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Start Creating</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;