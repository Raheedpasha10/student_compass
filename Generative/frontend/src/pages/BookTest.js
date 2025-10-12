import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import BookSearchTest from '../components/BookSearchTest';

const BookTest = () => {
  const { isDark } = useTheme();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={`container-full min-h-screen pt-24 professional-background relative overflow-hidden theme-text-primary ${isDark ? 'dark' : 'light'}`}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-pulseGlow blur-3xl ${isDark ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40' : 'bg-gradient-to-r from-blue-400/30 to-indigo-400/30'} animate-float`}></div>
        <div className={`absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-15 animate-drift blur-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40' : 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'}`}></div>
        
        {/* Subtle particle effects */}
        <div className={`absolute top-1/3 left-1/3 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{animationDuration: '9s', marginLeft: '-1px', marginTop: '-1px'}}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full animate-drift ${isDark ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{animationDuration: '11s', marginLeft: '-0.75px', marginTop: '-0.75px'}}></div>
        <div className={`absolute top-2/3 left-1/5 w-2.5 h-2.5 rounded-full animate-driftDelayed ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDuration: '13s', marginLeft: '-1.25px', marginTop: '-1.25px'}}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Books Integration Test
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Testing Google Books API integration with enhanced visual design
          </p>
        </div>
        
        <div className={`p-8 rounded-3xl backdrop-blur-xl border gradient-border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
          <BookSearchTest />
        </div>
      </div>
    </div>
  );
};

export default BookTest;