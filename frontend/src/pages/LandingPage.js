import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Upload, 
  Sparkles, 
  Heart, 
  Star,
  Gift,
  Camera
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-story-purple" />,
      title: "Upload Photo",
      description: "Simply upload a clear photo of your child and we'll work our magic"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-magic-pink" />,
      title: "We Transform",
      description: "Our artists transform your child into a magical fairy-tale character"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-mint" />,
      title: "Get Your Book",
      description: "Receive a beautiful printable PDF or choose our premium printed edition"
    }
  ];

  const storyTemplates = [
    {
      id: 1,
      title: "The Enchanted Forest Adventure",
      description: "A magical journey through an enchanted forest where animals talk and dreams come true",
      image: "/api/placeholder/300/400",
      theme: "Adventure"
    },
    {
      id: 2,
      title: "The Princess and the Dragon",
      description: "A brave child discovers that dragons aren't always what they seem",
      image: "/api/placeholder/300/400",
      theme: "Fantasy"
    },
    {
      id: 3,
      title: "The Magic Garden",
      description: "A whimsical tale of a secret garden where flowers bloom with every kind deed",
      image: "/api/placeholder/300/400",
      theme: "Nature"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-peach/30 to-lavender/20"></div>
        
        {/* Floating magical elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-6 h-6 bg-lavender/30 rounded-full blur-sm"
          />
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-20 w-4 h-4 bg-mint/40 rounded-full blur-sm"
          />
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 left-1/4 w-8 h-8 bg-peach/25 rounded-full blur-sm"
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-warm-brown mb-6 leading-tight">
              Turn Your Child Into the 
              <span className="text-gradient block">Hero of Their Own</span>
              <span className="text-gradient block">Magical Story</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="story-text text-xl text-warm-brown/80 mb-8 max-w-3xl mx-auto"
          >
            Create a personalized fairy-tale adventure where your little one is the star. 
            Upload their photo and watch them become the hero of an enchanting story they'll treasure forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/create" className="magic-button inline-flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Start Creating Magic</span>
            </Link>
            
            <button className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 border-story-purple text-story-purple hover:bg-story-purple hover:text-white transition-all duration-300">
              <Gift className="h-5 w-5" />
              <span>View Sample Books</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl font-bold text-warm-brown mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="story-text text-lg text-warm-brown/70 max-w-2xl mx-auto"
            >
              Creating your child's personalized fairy-tale book is as easy as 1-2-3!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="story-card p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-lavender/20 to-peach/20 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-warm-brown mb-4">
                  {feature.title}
                </h3>
                <p className="story-text text-warm-brown/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Templates Section */}
      <section className="py-20 bg-magic-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl font-bold text-warm-brown mb-4"
            >
              Magical Stories Await
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="story-text text-lg text-warm-brown/70 max-w-2xl mx-auto"
            >
              Choose from our enchanting collection of fairy-tale adventures
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storyTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="story-card p-6 group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-lavender/20 to-peach/20 rounded-lg mb-6 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-story-purple/50" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-lavender/20 text-story-purple text-sm font-medium rounded-full">
                    {template.theme}
                  </span>
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <h3 className="font-display text-xl font-semibold text-warm-brown mb-3">
                  {template.title}
                </h3>
                <p className="story-text text-warm-brown/70 mb-4">
                  {template.description}
                </p>
                <button className="text-story-purple hover:text-magic-pink font-medium transition-colors duration-300">
                  Choose This Story →
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/create" className="magic-button inline-flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Start Your Magical Journey</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-brown mb-6">
              Ready to Create Magic?
            </h2>
            <p className="story-text text-xl text-warm-brown/70 mb-8 max-w-2xl mx-auto">
              Join thousands of families who've already created magical memories with our personalized fairy-tale books.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/create" className="magic-button inline-flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Create Your Book Now</span>
              </Link>
              <div className="flex items-center space-x-2 text-warm-brown/60">
                <Heart className="h-5 w-5" />
                <span className="story-text">Made with love for little dreamers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
