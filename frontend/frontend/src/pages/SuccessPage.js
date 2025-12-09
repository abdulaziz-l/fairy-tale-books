import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Mail, BookOpen, Sparkles, Heart } from 'lucide-react';
import api from '../services/api';

const SuccessPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.getOrder(orderId);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-magic-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-story-purple border-t-transparent mb-4"></div>
          <p className="story-text text-warm-brown">Loading your order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-magic-gradient py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Magic in Progress! ✨
          </h1>
          <p className="story-text text-xl text-warm-brown/70 max-w-2xl mx-auto">
            Thank you for your order! We're already working on creating a magical fairy-tale adventure starring your little one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="story-card p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-warm-brown mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-lavender/10 rounded-lg">
                <span className="font-medium text-warm-brown">Order ID</span>
                <span className="font-mono text-story-purple">#{orderId}</span>
              </div>
              
              {orderDetails && (
                <>
                  <div className="flex items-center justify-between p-4 bg-lavender/10 rounded-lg">
                    <span className="font-medium text-warm-brown">Child's Name</span>
                    <span className="text-warm-brown">{orderDetails.childName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-lavender/10 rounded-lg">
                    <span className="font-medium text-warm-brown">Story Template</span>
                    <span className="text-warm-brown">{orderDetails.storyTitle}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-lavender/10 rounded-lg">
                    <span className="font-medium text-warm-brown">Email</span>
                    <span className="text-warm-brown">{orderDetails.email}</span>
                  </div>
                </>
              )}
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <span className="font-medium text-warm-brown">Status</span>
                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
                  In Progress
                </span>
              </div>
            </div>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="story-card p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-warm-brown mb-6">
              What's Next?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-story-purple rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-warm-brown mb-1">Order Received</h3>
                  <p className="story-text text-warm-brown/70">
                    We've received your order and our artists are excited to start creating!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-magic-pink rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-warm-brown mb-1">Artistic Magic</h3>
                  <p className="story-text text-warm-brown/70">
                    Our talented artists will transform your child's photo into a fairy-tale character.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-mint rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-warm-brown mb-1">Email Delivery</h3>
                  <p className="story-text text-warm-brown/70">
                    You'll receive the completed PDF storybook via email within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 story-card p-8 text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Clock className="h-8 w-8 text-story-purple" />
            <h2 className="font-display text-2xl font-semibold text-warm-brown">
              Estimated Timeline
            </h2>
          </div>
          
          <div className="bg-lavender/10 rounded-lg p-6">
            <p className="story-text text-lg text-warm-brown mb-2">
              Your magical story will be ready in
            </p>
            <p className="font-display text-3xl font-bold text-gradient mb-2">
              3-5 Business Days
            </p>
            <p className="story-text text-warm-brown/70">
              We'll send you an email with the download link as soon as it's ready!
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 px-8 py-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-story-purple font-semibold">
            <Heart className="h-5 w-5" />
            <span>Return to Home</span>
          </Link>
        </motion.div>

        {/* Keep Checking Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="story-text text-warm-brown/60">
            Keep an eye on your inbox - magic is on its way! ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;