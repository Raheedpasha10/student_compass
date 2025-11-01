import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import Enhanced3DButton from '../components/Enhanced3DButton';
import SearchBar from '../components/SearchBar';
import { quickSelectDomains, categories, fieldsByCategory, domainsByField } from '../constants/careerData';

const Landing = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const navigate = useNavigate();
  const { setCurrentSkills, setCurrentExpertise } = useAppContext();

  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 300);
    const timer2 = setTimeout(() => setAnimationStage(2), 600);
    const timer3 = setTimeout(() => setAnimationStage(3), 900);
    const timer4 = setTimeout(() => setAnimationStage(4), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleQuickSelect = (item) => {
    setCurrentSkills(item.field);
    setCurrentExpertise('Beginner');
    setTimeout(() => {
      navigate('/simplified-ultimate-roadmap');
    }, 100);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedField('');
    setActiveTab('fields');
  };

  // Handle field selection
  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setActiveTab('specializations');
  };

  // Handle domain selection and navigation
  const handleDomainSelect = (domain) => {
    // Pass the specialization (domain) instead of the field
    setCurrentSkills(domain);
    setCurrentExpertise('Beginner');
    setTimeout(() => {
      navigate('/simplified-ultimate-roadmap');
    }, 100);
  };

  // Toggle more content
  const toggleMoreContent = () => {
    setShowMoreContent(!showMoreContent);
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedCategory('');
    setSelectedField('');
    setActiveTab('categories');
  };

  // Get fields for current category
  const fields = fieldsByCategory[selectedCategory] || [];

  // Get domains for current field
  const domains = domainsByField[selectedField] || [];

  // Container variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item variants for animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Scroll to career selection section
  const scrollToCareerSelection = (e) => {
    e.preventDefault();
    const element = document.getElementById('choose-interest-area');
    if (element) {
      // Use a more reliable scrolling method
      const yOffset = -80; // Adjust for fixed header if needed
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full transition-all duration-500 professional-background theme-text-primary pt-20 dark">
      {/* Enhanced Creative Background System */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950"></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section with 3D enhancements */}
        <section className="hero-section relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStage >= 1 ? 1 : 0, y: animationStage >= 1 ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Career Guidance Redefined
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: animationStage >= 2 ? 1 : 0, y: animationStage >= 2 ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <span className="block">Discover Your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Perfect Career Path
                </span>
              </motion.h1>
              
              <motion.p 
                className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStage >= 3 ? 1 : 0, y: animationStage >= 3 ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Explore thousands of career opportunities tailored to your interests and skills. 
                Find the path that aligns with your passion and potential.
              </motion.p>
              
              {/* Enhanced Search Bar with 3D effects */}
              <motion.div 
                className="max-w-2xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStage >= 4 ? 1 : 0, y: animationStage >= 4 ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <SearchBar />
              </motion.div>

              {/* Quick Select Domains with 3D cards */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular Career Paths</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickSelectDomains.map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift animate-fadeIn floating-card interactive-glow h-full flex flex-col"
                      onClick={() => handleQuickSelect(item)}
                      whileHover={{ 
                        y: -10,
                        rotateX: 5,
                        rotateY: 5,
                        scale: 1.02
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                    >
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="theme-text-secondary text-sm">Specialization: {item.field}</p>
                      </div>
                      <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Quick Explore
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Direct Navigation Button */}
              <motion.div 
                className="mb-16 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Enhanced3DButton 
                  onClick={scrollToCareerSelection}
                  className="animate-interactiveGlow"
                  size="lg"
                  variant="primary"
                >
                  Explore More
                </Enhanced3DButton>
              </motion.div>
            </div>
          </div>
          
        </section>

        {/* Career Selection Section with Tabbed Interface */}
        <section id="choose-interest-area" className="py-16 px-4 md:px-8 relative z-10 bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-900/50 mt-[-2rem]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Find Your Perfect Career
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Navigate through our comprehensive career exploration system to discover paths that match your interests
              </p>
            </motion.div>
            
            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="flex justify-center">
                <div className="flex items-center">
                  {['categories', 'fields', 'specializations'].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        activeTab === step 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110' 
                          : activeTab === 'fields' && step === 'categories'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                          : activeTab === 'specializations' && (step === 'categories' || step === 'fields')
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      {index < 2 && (
                        <div className={`w-16 h-1.5 mx-2 rounded-full transition-all duration-300 ${
                          activeTab === 'fields' && step === 'categories'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : activeTab === 'specializations' && (step === 'categories' || step === 'fields')
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <div className="text-center flex space-x-8">
                  <span className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === 'categories' 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-200 shadow-md' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Categories
                  </span>
                  <span className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === 'fields' 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-200 shadow-md' 
                      : activeTab === 'specializations' && selectedField
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/50 dark:to-emerald-900/50 dark:text-green-200 shadow-md'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Fields
                  </span>
                  <span className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === 'specializations' 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-200 shadow-md' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Specializations
                  </span>
                </div>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {categories.map((category) => (
                        <motion.div
                          key={category.id}
                          className="p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift gradient-border interactive-glow-primary h-full flex flex-col enhanced-card-hover backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-700/50"
                          onClick={() => handleCategorySelect(category.id)}
                          variants={itemVariants}
                          whileHover={{ 
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          <div className="flex-grow flex flex-col items-center text-center">
                            <div className="text-4xl mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">{category.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                            <p className="theme-text-secondary text-sm mb-4">{category.description}</p>
                          </div>
                          <div className="mt-auto">
                            <Enhanced3DButton 
                              size="sm" 
                              variant="secondary"
                              className="w-full"
                            >
                              Explore
                            </Enhanced3DButton>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Fields Tab */}
                {activeTab === 'fields' && (
                  <motion.div
                    key="fields"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                      <div className="flex items-center">
                        <button
                          onClick={resetSelection}
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back to Categories
                        </button>
                        <div className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          Selected: {categories.find(c => c.id === selectedCategory)?.name}
                        </div>
                      </div>
                      
                      <div className="relative w-full md:w-64 enhanced-gradient-border rounded-xl">
                        <input
                          type="text"
                          placeholder="Filter fields..."
                          className="w-full p-3 pl-10 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {fields.map((field, index) => (
                        <motion.div
                          key={index}
                          className="p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift gradient-border interactive-glow-primary h-full flex flex-col enhanced-card-hover backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-700/50"
                          onClick={() => handleFieldSelect(field)}
                          variants={itemVariants}
                          whileHover={{ 
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-3">{field}</h3>
                            <p className="theme-text-secondary text-sm mb-4">
                              {domainsByField[field]?.length || 0} Specializations Available
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-1 mb-4">
                              {domainsByField[field]?.slice(0, 3).map((domain, idx) => (
                                <span key={idx} className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                                  {domain}
                                </span>
                              ))}
                              {domainsByField[field]?.length > 3 && (
                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                  +{domainsByField[field].length - 3} more
                                </span>
                              )}
                            </div>
                            <Enhanced3DButton 
                              size="sm" 
                              variant="secondary"
                              className="w-full"
                            >
                              Select Field
                            </Enhanced3DButton>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Specializations Tab */}
                {activeTab === 'specializations' && (
                  <motion.div
                    key="specializations"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                      <div className="flex items-center">
                        <button
                          onClick={resetSelection}
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back to Categories
                        </button>
                        <div className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          Selected: {selectedField}
                        </div>
                      </div>
                      
                      <div className="relative w-full md:w-64 enhanced-gradient-border rounded-xl">
                        <input
                          type="text"
                          placeholder="Filter specializations..."
                          className="w-full p-3 pl-10 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {domains.map((domain, index) => (
                        <motion.div
                          key={index}
                          className="p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift gradient-border interactive-glow-primary h-full flex flex-col enhanced-card-hover backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-700/50"
                          onClick={() => handleDomainSelect(domain)}
                          variants={itemVariants}
                          whileHover={{ 
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-3">{domain}</h3>
                            <p className="theme-text-secondary text-sm">
                              Specialization in {selectedField}
                            </p>
                          </div>
                          <div className="mt-4">
                            <Enhanced3DButton 
                              size="sm" 
                              variant="secondary"
                              className="w-full"
                            >
                              Select Specialization
                            </Enhanced3DButton>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
