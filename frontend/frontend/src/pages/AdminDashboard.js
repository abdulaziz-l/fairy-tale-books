import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  BookOpen, 
  Upload, 
  CheckCircle, 
  Clock, 
  Download, 
  Eye, 
  LogOut,
  FileText,
  Image,
  Mail,
  User,
  RefreshCw
} from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handlePdfUpload = async (orderId, file) => {
    if (!file) return;

    setUploadingPdf(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      await api.uploadOrderPdf(orderId, formData);
      toast.success('PDF uploaded successfully! 📚');
      
      // Refresh orders
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast.error('Failed to upload PDF');
    } finally {
      setUploadingPdf(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="status-badge status-pending flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </span>
        );
      case 'ready':
        return (
          <span className="status-badge status-ready flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>Ready</span>
          </span>
        );
      default:
        return (
          <span className="status-badge status-pending">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-magic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-story-purple border-t-transparent mb-4"></div>
          <p className="story-text text-warm-brown">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-magic-gradient py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-2">
              Admin Dashboard
            </h1>
            <p className="story-text text-warm-brown/70">
              Manage fairy-tale book orders
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex space-x-4"
          >
            <button
              onClick={fetchOrders}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <RefreshCw className="h-4 w-4 text-story-purple" />
              <span className="text-warm-brown">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="h-4 w-4 text-red-600" />
              <span className="text-red-600">Logout</span>
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="story-card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-display text-2xl font-bold text-warm-brown">
              {orders.filter(o => o.status === 'pending').length}
            </h3>
            <p className="story-text text-warm-brown/70">Pending Orders</p>
          </div>
          
          <div className="story-card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-display text-2xl font-bold text-warm-brown">
              {orders.filter(o => o.status === 'ready').length}
            </h3>
            <p className="story-text text-warm-brown/70">Completed Orders</p>
          </div>
          
          <div className="story-card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-story-purple rounded-full mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-warm-brown">
              {orders.length}
            </h3>
            <p className="story-text text-warm-brown/70">Total Orders</p>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="story-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Child Name</th>
                  <th>Story Template</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-lavender/5">
                    <td className="font-mono text-sm text-story-purple">#{order.orderId}</td>
                    <td className="font-medium text-warm-brown">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-lavender" />
                        <span>{order.childName}</span>
                      </div>
                    </td>
                    <td className="story-text text-warm-brown/70">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-mint" />
                        <span>{order.storyTitle}</span>
                      </div>
                    </td>
                    <td className="story-text text-warm-brown/70">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-peach" />
                        <span>{order.email}</span>
                      </div>
                    </td>
                    <td className="story-text text-warm-brown/70">
                      {formatDate(order.createdAt)}
                    </td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>
                      <div className="flex space-x-2">
                        {order.status === 'pending' && (
                          <label className="cursor-pointer flex items-center space-x-1 px-3 py-1 bg-story-purple text-white rounded-lg hover:bg-magic-pink transition-colors">
                            <Upload className="h-4 w-4" />
                            <span className="text-sm">Upload PDF</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf"
                              onChange={(e) => handlePdfUpload(order._id, e.target.files[0])}
                              disabled={uploadingPdf}
                            />
                          </label>
                        )}
                        
                        {order.status === 'ready' && order.pdfUrl && (
                          <a
                            href={order.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span className="text-sm">Download</span>
                          </a>
                        )}
                        
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="story-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-display text-2xl font-semibold text-warm-brown mb-6">
                Order Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg">
                  <span className="font-medium text-warm-brown">Order ID</span>
                  <span className="font-mono text-story-purple">#{selectedOrder.orderId}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg">
                  <span className="font-medium text-warm-brown">Child's Name</span>
                  <span className="text-warm-brown">{selectedOrder.childName}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg">
                  <span className="font-medium text-warm-brown">Story Template</span>
                  <span className="text-warm-brown">{selectedOrder.storyTitle}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg">
                  <span className="font-medium text-warm-brown">Email</span>
                  <span className="text-warm-brown">{selectedOrder.email}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg">
                  <span className="font-medium text-warm-brown">Created</span>
                  <span className="text-warm-brown">{formatDate(selectedOrder.createdAt)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-lavender/10 rounded-lg">
                  <span className="font-medium text-warm-brown">Status</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                
                {selectedOrder.status === 'ready' && selectedOrder.pdfUrl && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-warm-brown">PDF Ready</span>
                    <a
                      href={selectedOrder.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-story-purple hover:text-magic-pink"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;