import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  // Reorganized navbar items in the requested sequence:
  // Home -> Roadmap -> Flowchart -> Books -> Career Paths
  const navItems = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/simplified-ultimate-roadmap', label: 'Roadmap', icon: 'fa-stream' },
    { path: '/flowchart', label: 'Flowchart', icon: 'fa-project-diagram' },
    { path: '/book-test', label: 'Books', icon: 'fa-book' },
    { path: '/career-path', label: 'Career Paths', icon: 'fa-road' },
    { path: '/test-links', label: 'Test Links', icon: 'fa-vial' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10001] border-b transition-all duration-300 shadow-lg ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10001 }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center group">
            <h1 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              STUDENT COMPASS
            </h1>
            <span className="ml-3 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full font-bold">
              AI-Powered
            </span>
          </div>

          {/* Desktop Navigation with Enhanced Design */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-3 rounded-2xl flex items-center space-x-2.5 transition-all duration-300 font-bold text-sm hover-lift border ${
                    location.pathname === item.path
                      ? `bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-transparent`
                      : `border ${isDark ? 'text-gray-200 hover:bg-gray-800 border-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 border-gray-200 hover:text-gray-900'}`
                  }`}
                >
                  <i className={`fas ${item.icon} text-sm`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Search Bar */}
            <div className="ml-4 relative hidden lg:block">
              <div className="relative enhanced-gradient-border rounded-xl hover-lift">
                <input
                  type="text"
                  placeholder="Search careers, skills..."
                  className="w-48 lg:w-56 xl:w-64 py-2 pl-10 pr-4 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          <button
            className={`md:hidden p-3 rounded-2xl border transition-all duration-300 hover-lift ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden py-5 border-t rounded-b-2xl ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mx-3 px-5 py-4 rounded-2xl flex items-center space-x-3.5 transition-all duration-300 font-bold hover-lift ${
                    location.pathname === item.path 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-transparent' 
                      : `border ${isDark ? 'text-gray-200 hover:bg-gray-800 border-gray-700' : 'text-gray-700 hover:bg-gray-100 border-gray-200 hover:text-gray-900'}`
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className={`fas ${item.icon} w-5 text-base`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <div className="mx-3 mt-2 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;