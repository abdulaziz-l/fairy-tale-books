import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-warm-brown text-cream py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-peach" />
              <span className="font-display text-xl font-bold text-peach">
                Fairy Tale Books
              </span>
            </div>
            <p className="story-text text-cream/80">
              Creating magical moments that last a lifetime. Every child deserves to be the hero of their own story.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-peach">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cream/80 hover:text-peach transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-cream/80 hover:text-peach transition-colors duration-300">
                  Create Book
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-peach">Get in Touch</h3>
            <div className="flex items-center space-x-2 text-cream/80">
              <Mail className="h-4 w-4" />
              <span>hello@fairytalebooks.com</span>
            </div>
            <div className="flex items-center space-x-2 text-cream/80">
              <Heart className="h-4 w-4" />
              <span>Made with love for little dreamers</span>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center">
          <p className="text-cream/60 story-text">
            © {new Date().getFullYear()} Fairy Tale Portrait Books. All rights reserved. ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;