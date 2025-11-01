import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navbar items: Home -> Roadmap -> Flowchart -> Career Paths
  const navItems = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/simplified-ultimate-roadmap', label: 'Roadmap', icon: 'fa-stream' },
    { path: '/flowchart', label: 'Flowchart', icon: 'fa-project-diagram' },
    { path: '/career-path', label: 'Career Paths', icon: 'fa-road' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[10001] border-b transition-all duration-300 shadow-lg bg-gray-900 border-gray-700" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10001 }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center group">
            <h1 className="text-2xl font-extrabold text-white">
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
                      : `border text-gray-200 hover:bg-gray-800 border-gray-700 hover:text-white`
                  }`}
                >
                  <i className={`fas ${item.icon} text-sm`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Search Bar */}
            <div className="ml-4 hidden lg:block">
              <SearchBar 
                placeholder="Search careers..." 
                className="w-48 lg:w-56 xl:w-64"
                compact={true}
              />
            </div>
          </div>

          <button
            className="md:hidden p-3 rounded-2xl border transition-all duration-300 hover-lift bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-5 border-t rounded-b-2xl border-gray-700 bg-gray-900">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mx-3 px-5 py-4 rounded-2xl flex items-center space-x-3.5 transition-all duration-300 font-bold hover-lift ${
                    location.pathname === item.path 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-transparent' 
                      : `border text-gray-200 hover:bg-gray-800 border-gray-700`
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className={`fas ${item.icon} w-5 text-base`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;