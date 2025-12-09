import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Upload, X, BookOpen, Mail, User, Sparkles, Camera } from 'lucide-react';
import api from '../services/api';

const UploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

  const storyTemplates = [
    { id: 'enchanted-forest', title: 'The Enchanted Forest Adventure', theme: 'Adventure' },
    { id: 'princess-dragon', title: 'The Princess and the Dragon', theme: 'Fantasy' },
    { id: 'magic-garden', title: 'The Magic Garden', theme: 'Nature' }
  ];

  const selectedStory = watch('storyTemplate');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === 'file-too-large') {
          toast.error('File is too large. Maximum size is 5MB.');
        } else if (error.code === 'file-invalid-type') {
          toast.error('Please upload only JPG or PNG files.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setValue('photo', file);
        toast.success('Photo uploaded successfully! ✨');
      }
    }
  });

  const removeFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setValue('photo', null);
  };

  const onSubmit = async (data) => {
    if (!uploadedFile) {
      toast.error('Please upload a photo of your child.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('childName', data.childName);
      formData.append('storyTemplate', data.storyTemplate);
      formData.append('email', data.email);
      formData.append('photo', uploadedFile);

      const response = await api.createOrder(formData);
      
      toast.success('Order created successfully! 🎉');
      navigate(`/success/${response.data.orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-magic-gradient py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-4">
            Create Your Magical Story
          </h1>
          <p className="story-text text-xl text-warm-brown/70 max-w-2xl mx-auto">
            Upload your child's photo and choose their adventure. We'll transform them into the hero of their own fairy tale!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="story-card p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Child's Name */}
            <div>
              <label className="block text-sm font-medium text-warm-brown mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Child's Name
              </label>
              <input
                {...register('childName', { 
                  required: "Please enter your child's name",
                  minLength: { value: 2, message: "Name must be at least 2 characters long" }
                })}
                type="text"
                className="magic-input"
                placeholder="Enter your child's name"
              />
              {errors.childName && (
                <p className="mt-2 text-sm text-red-600">{errors.childName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-warm-brown mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address
              </label>
              <input
                {...register('email', { 
                  required: "Please enter your email address",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                type="email"
                className="magic-input"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Story Template Selection */}
            <div>
              <label className="block text-sm font-medium text-warm-brown mb-4">
                <BookOpen className="inline h-4 w-4 mr-1" />
                Choose a Story Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {storyTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    className={`story-template-card ${
                      selectedStory === template.id ? 'ring-2 ring-story-purple bg-lavender/10' : ''
                    }`}
                  >
                    <input
                      {...register('storyTemplate', { required: "Please select a story template" })}
                      type="radio"
                      id={template.id}
                      value={template.id}
                      className="sr-only"
                    />
                    <label htmlFor={template.id} className="cursor-pointer">
                      <div className="aspect-[3/4] bg-gradient-to-br from-lavender/20 to-peach/20 rounded-lg mb-4 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-story-purple/50" />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-lavender/20 text-story-purple text-xs font-medium rounded-full">
                          {template.theme}
                        </span>
                        {selectedStory === template.id && (
                          <Sparkles className="h-5 w-5 text-story-purple" />
                        )}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-warm-brown mb-2">
                        {template.title}
                      </h3>
                    </label>
                  </motion.div>
                ))}
              </div>
              {errors.storyTemplate && (
                <p className="mt-2 text-sm text-red-600">{errors.storyTemplate.message}</p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-warm-brown mb-4">
                <Camera className="inline h-4 w-4 mr-1" />
                Upload Child's Photo
              </label>
              
              {!previewUrl ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                      ? 'border-story-purple bg-lavender/10' 
                      : 'border-lavender/50 hover:border-lavender hover:bg-lavender/5'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-lavender mb-4" />
                  <p className="story-text text-warm-brown mb-2">
                    {isDragActive ? 'Drop the photo here!' : 'Drag & drop a photo here, or click to select'}
                  </p>
                  <p className="text-sm text-warm-brown/60">
                    JPG or PNG, max 5MB. Please use a clear, well-lit photo.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={previewUrl}
                      alt="Child preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-center mt-2 text-sm text-warm-brown/70">
                    Photo uploaded successfully! ✨
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting || !uploadedFile}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="magic-button inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-warm-brown border-t-transparent"></div>
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Create My Book</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 story-card p-6 bg-white/60"
        >
          <h3 className="font-display text-lg font-semibold text-warm-brown mb-3">
            What happens next?
          </h3>
          <ul className="story-text text-warm-brown/70 space-y-2">
            <li className="flex items-start space-x-2">
              <Sparkles className="h-4 w-4 text-story-purple mt-1 flex-shrink-0" />
              <span>We'll receive your order and photo</span>
            </li>
            <li className="flex items-start space-x-2">
              <Sparkles className="h-4 w-4 text-story-purple mt-1 flex-shrink-0" />
              <span>Our artists will transform your child into a fairy-tale character</span>
            </li>
            <li className="flex items-start space-x-2">
              <Sparkles className="h-4 w-4 text-story-purple mt-1 flex-shrink-0" />
              <span>You'll receive the completed PDF via email within 3-5 business days</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;