import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { fieldsByCategory, domainsByField } from '../constants/careerData';

const SearchBar = ({ onNavigate, placeholder = "Search careers, skills, or specializations...", className = "", compact = false }) => {
  const navigate = useNavigate();
  const { setCurrentSkills, setCurrentExpertise } = useAppContext();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionRef = useRef(null);

  // Size classes based on compact prop
  const inputClasses = compact 
    ? "flex-grow p-2 pl-10 pr-10 rounded-l-xl text-sm shadow-md theme-input focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border-0 text-white"
    : "flex-grow p-5 pl-10 pr-16 rounded-l-2xl text-lg shadow-lg theme-input focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border-0 text-white";
  
  const buttonClasses = compact
    ? "rounded-r-xl h-full py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all duration-300 hover:scale-105"
    : "rounded-r-2xl h-full py-5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all duration-300 hover:scale-105";
  
  const iconClasses = compact ? "h-4 w-4" : "h-6 w-6";
  const containerClasses = compact ? "rounded-xl" : "rounded-2xl";

  // Build search index: categories, fields, and domains
  useEffect(() => {
    const allFields = Object.values(fieldsByCategory).flat();
    const allDomains = Object.values(domainsByField).flat();
    
    const searchIndex = [
      ...allFields.map(field => ({ text: field, type: 'field', category: 'Fields' })),
      ...allDomains.map(domain => ({ text: domain, type: 'domain', category: 'Specializations' }))
    ];

    // Store in component for use in filter
    searchRef.current = searchIndex;
  }, []);

  // Filter suggestions as user types
  useEffect(() => {
    if (query.trim().length > 0 && searchRef.current) {
      const lowerQuery = query.toLowerCase();
      const filtered = searchRef.current
        .filter(item => item.text.toLowerCase().includes(lowerQuery))
        .slice(0, 8) // Limit to 8 suggestions
        .sort((a, b) => {
          // Prioritize exact matches
          const aStarts = a.text.toLowerCase().startsWith(lowerQuery);
          const bStarts = b.text.toLowerCase().startsWith(lowerQuery);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return 0;
        });
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex].text);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (text) => {
    setQuery(text);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    // Navigate to roadmap with the selected skill
    setCurrentSkills(text);
    setCurrentExpertise('Beginner');
    setTimeout(() => {
      navigate('/simplified-ultimate-roadmap');
    }, 100);
    
    if (onNavigate) {
      onNavigate(text);
    }
  };

  // Handle direct search on Enter without selection
  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim() && selectedIndex === -1) {
      const lowerQuery = query.toLowerCase();
      const allFields = Object.values(fieldsByCategory).flat();
      const allDomains = Object.values(domainsByField).flat();
      
      // Try to find exact match
      const exactMatch = allFields.find(f => f.toLowerCase() === lowerQuery) || 
                        allDomains.find(d => d.toLowerCase() === lowerQuery);
      
      if (exactMatch) {
        handleSelectSuggestion(exactMatch);
      } else {
        setShowSuggestions(true);
      }
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={suggestionRef}>
      <div className={`relative enhanced-gradient-border hover-lift interactive-glow-primary ${containerClasses}`}>
        <div className="flex items-center relative">
          <svg xmlns="http://www.w3.org/2000/svg" className={`absolute ${compact ? 'h-3 w-3' : 'h-4 w-4'} left-3 text-gray-400 z-10`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={placeholder}
            className={inputClasses}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              handleKeyDown(e);
              handleSearch(e);
            }}
            onFocus={() => query.trim() && suggestions.length > 0 && setShowSuggestions(true)}
          />
          <button
            className={buttonClasses}
            onClick={(e) => {
              if (query.trim()) {
                handleSearch({ key: 'Enter', preventDefault: () => {} });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 backdrop-blur-xl">
          {suggestions.map((item, index) => (
            <button
              key={`${item.type}-${item.text}-${index}`}
              className={`w-full text-left px-6 py-4 hover:bg-gray-700 transition-colors duration-150 flex items-center justify-between ${
                index === selectedIndex ? 'bg-gray-700' : ''
              } ${index === 0 ? 'rounded-t-2xl' : ''} ${index === suggestions.length - 1 ? 'rounded-b-2xl' : ''}`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => handleSelectSuggestion(item.text)}
            >
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-white font-medium">{item.text}</span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{item.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

