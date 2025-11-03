import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import LinearButton from '../components/LinearButton';
import LinearCard from '../components/LinearCard';
import { categories, fieldsByCategory, domainsByField } from '../constants/careerData';

// Lazy load mind map component
const CareerMindMap = lazy(() => import('../components/CareerMindMap'));

// Path maps for mind map nodes
const PATH_MAPS = {
  software: ['React', 'Node.js', 'API', 'System Design', 'Databases', 'DevOps'],
  data: ['Python', 'ML', 'Pandas', 'Data Viz', 'Neural Nets'],
  ux: ['Figma', 'Wireframes', 'Prototyping', 'User Flow', 'Typography'],
  marketing: ['SEO', 'Analytics', 'Branding', 'Growth', 'Campaigns']
};

// Map pattern to path key
const PATTERN_TO_PATH = {
  'code': 'software',
  'chart': 'data',
  'grid': 'ux',
  'trend': 'marketing'
};

const Landing = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [animationStage, setAnimationStage] = useState(0);
  const [activeCareerIndex, setActiveCareerIndex] = useState(0);
  const navigate = useNavigate();
  const { setCurrentSkills, setCurrentExpertise } = useAppContext();
  const heroRef = useRef(null);
  const carouselRef = useRef(null);

  // Simple hero fade effect for performance
  const [heroBlur, setHeroBlur] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Career data (must be defined before useEffect that uses it)
  const popularCareers = [
    {
      title: 'Software Engineering',
      subtitle: 'Build the future with code',
      field: 'Software Engineering',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      pattern: 'code'
    },
    {
      title: 'Data Science',
      subtitle: 'Transform data into insights',
      field: 'Data Science',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="12" y1="20" x2="12" y2="10"/>
          <line x1="18" y1="20" x2="18" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="16"/>
        </svg>
      ),
      pattern: 'chart'
    },
    {
      title: 'UI/UX Design',
      subtitle: 'Craft beautiful experiences',
      field: 'User Experience Design',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
      pattern: 'grid'
    },
    {
      title: 'Digital Marketing',
      subtitle: 'Grow brands strategically',
      field: 'Digital Marketing',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
      pattern: 'trend'
    }
  ];

  // Staggered animation sequence
  useEffect(() => {
    const timers = [100, 200, 300, 400].map((delay, i) => 
      setTimeout(() => setAnimationStage(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Optimized scroll fade for hero (passive, requestAnimationFrame throttled)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const triggerPoint = window.innerHeight * 0.2;
          const fadeRange = window.innerHeight * 0.35;
          
          const progress = Math.max(0, Math.min(1, (scrollTop - triggerPoint) / fadeRange));
          setHeroBlur(progress * 8);
          setHeroOpacity(Math.max(0.4, 1 - progress * 0.6));
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track carousel scroll position for indicator
  useEffect(() => {
    const carouselContainer = carouselRef.current;
    if (!carouselContainer) return;

    let ticking = false;
    const handleCarouselScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollLeft = carouselContainer.scrollLeft;
          const scrollWidth = carouselContainer.scrollWidth - carouselContainer.clientWidth;
          const progress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;
          const index = Math.round(progress * (popularCareers.length - 1));
          setActiveCareerIndex(Math.min(index, popularCareers.length - 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    carouselContainer.addEventListener('scroll', handleCarouselScroll, { passive: true });
    return () => carouselContainer.removeEventListener('scroll', handleCarouselScroll);
  }, []);

  const handleQuickSelect = (field) => {
    setCurrentSkills(field);
    setCurrentExpertise('Beginner');
      navigate('/simplified-ultimate-roadmap');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedField('');
    setActiveTab('fields');
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setActiveTab('specializations');
  };

  const handleDomainSelect = (domain) => {
    setCurrentSkills(domain);
    setCurrentExpertise('Beginner');
      navigate('/simplified-ultimate-roadmap');
  };

  const resetSelection = () => {
    setSelectedCategory('');
    setSelectedField('');
    setActiveTab('categories');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const fields = fieldsByCategory[selectedCategory] || [];
  const domains = domainsByField[selectedField] || [];

  // Refined Career Scene Component - Linear elegance
  const CareerScene = ({ career, index, onSelect }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showMindMap, setShowMindMap] = useState(false);
    const [mindMapMounted, setMindMapMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sceneRef = useRef(null);
    
    // Note: Removed parallax scroll effects to prevent flicker on navigation/refresh
    
    // Detect mobile
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lazy load mind map on first hover
    const handleMouseEnter = () => {
      setIsHovered(true);
      setShowMindMap(true);
      if (!mindMapMounted) {
        setMindMapMounted(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setShowMindMap(false);
    };

    // Get nodes for this career
    const pathKey = PATTERN_TO_PATH[career.pattern];
    const nodes = PATH_MAPS[pathKey] || [];

    // Minimal animated background
    const renderBackground = () => {
      switch (career.pattern) {
        case 'code':
          return (
            <div className="absolute inset-0 opacity-[0.015]">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 36px)',
                  backgroundSize: '60px 60px',
                }}
              />
            </div>
          );
        case 'chart':
          return (
            <div className="absolute inset-0 opacity-[0.015]">
              <svg className="absolute inset-0 w-full h-full">
                {[0, 1, 2].map((i) => (
                  <motion.line
                    key={i}
                    x1="0"
                    y1={`${35 + i * 20}%`}
                    x2="100%"
                    y2={`${40 + i * 10}%`}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.5"
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </svg>
            </div>
          );
        case 'grid':
          return (
            <div className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          );
        case 'trend':
          return (
            <div className="absolute inset-0 opacity-[0.015]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: '2px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)',
                    left: `${20 + i * 30}%`,
                  }}
                  animate={{
                    y: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <motion.div
        ref={sceneRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full snap-start"
        whileHover={{ y: -6 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200
        }}
      >
        {/* Featured card ambient border glow */}
        {index === 0 && (
          <div
            className="absolute inset-0 pointer-events-none rounded-12"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.03)',
            }}
          />
        )}

        <LinearCard
          onClick={() => onSelect(career.field)}
          className="relative cursor-pointer overflow-hidden"
          style={{ 
            minHeight: '420px',
          }}
        >
          {/* Minimal background */}
          {renderBackground()}

          {/* Lazy-loaded mind map */}
          {mindMapMounted && (
            <Suspense fallback={null}>
              <CareerMindMap 
                nodes={nodes} 
                pattern={career.pattern}
                visible={showMindMap} 
                isMobile={isMobile} 
              />
            </Suspense>
          )}

          <div className="relative p-8 h-full flex flex-col justify-between">
            <div>
              {/* Featured Label */}
              {index === 0 && (
                <span
                  className="inline-flex items-center gap-2 text-micro font-medium mb-4 px-2 py-1 rounded-4"
                  style={{
                    background: 'transparent',
                    color: '#d0d6e0',
                    border: '0.5px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  Featured Path
                </span>
              )}
              
              {/* Icon with subtle glow */}
              <div className="relative mb-6">
                <motion.div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
                    filter: 'blur(20px)',
                  }}
                  animate={{ 
                    scale: isHovered ? 1.2 : 1,
                    opacity: isHovered ? 1 : 0.5
                  }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 200
                  }}
                />
                <motion.div
                  className="relative"
                  animate={{ 
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 200
                  }}
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {career.icon}
                </motion.div>
              </div>
              
              <motion.h3 
                className="text-title-2 font-semibold mb-3"
                style={{ 
                  letterSpacing: '-.012em',
                  color: '#f7f8f8'
                }}
                animate={{
                  y: isHovered ? -20 : 0
                }}
                transition={{
                  y: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                {career.title}
              </motion.h3>
              
              <motion.p 
                className="text-regular mb-6"
                style={{ color: '#d0d6e0' }}
                animate={{
                  y: isHovered ? 10 : 0,
                  opacity: isHovered ? 0.5 : 1
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {career.subtitle}
              </motion.p>
            </div>

            {/* Arrow with enhanced animation */}
            <motion.div 
              className="flex items-center gap-2 text-small font-medium"
              animate={{ 
                x: isHovered ? 6 : 0,
                opacity: isHovered ? 0.5 : 1
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              <span>Explore path</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </motion.div>
          </div>
        </LinearCard>

        {/* Soft inner shadow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-12"
          style={{
            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section - Balanced Linear Composition */}
      <section ref={heroRef} className="relative" style={{ minHeight: '135vh', paddingTop: '64px', paddingBottom: '80px', background: '#08090a', overflow: 'hidden' }}>
        <div className="w-full h-full flex flex-col justify-center">
          {/* Top: Text Content - Max 32-35vh, tight composition */}
          <div className="flex-shrink-0" style={{ height: '32vh', paddingTop: '6vh' }}>
            <div className="w-full px-6">
              <div style={{ maxWidth: 'clamp(600px, 60vw, 720px)', margin: '0 auto', textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
              <motion.h1 
                  className="font-semibold mb-4"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    lineHeight: '1.15',
                    letterSpacing: '-.022em',
                    color: '#f7f8f8',
                    fontWeight: 590
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationStage >= 1 ? 1 : 0, y: animationStage >= 1 ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Career guidance that moves at your pace
              </motion.h1>
              
              <motion.p 
                  className="mb-10"
                  style={{ 
                    lineHeight: '1.6', 
                    color: '#8a8f98',
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                    maxWidth: '580px',
                    margin: '0 auto',
                    fontWeight: 400
                  }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStage >= 2 ? 1 : 0, y: animationStage >= 2 ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                  AI-powered roadmaps, personalized learning paths, and progress tracking—everything you need to transition from student to professional.
              </motion.p>
              
                <motion.div 
                  className="flex items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationStage >= 3 ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <LinearButton
                    variant="primary"
                    size="large"
                    onClick={() => scrollToSection('explore')}
                  >
                    Get started
                  </LinearButton>
                  <LinearButton
                    variant="secondary"
                    size="large"
                    onClick={() => navigate('/career-path')}
                  >
                    Explore careers
                  </LinearButton>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Generous Gap - 12vh breathing room */}
          <div style={{ height: '12vh' }}></div>

          {/* Bottom: Cinematic Tilted Preview Visual - Linear Style */}
          <div 
            className="flex-1 relative flex items-start justify-center" 
            style={{ 
              width: '100%',
              perspective: '2000px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Cinematic Vignette - Dramatic lighting */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 120% 100% at 50% 40%, transparent 0%, rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 0.95) 100%)',
                zIndex: 1,
              }}
            />

            {/* Soft Shadow beneath mockup */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '30%',
                width: '60%',
                height: '50%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 35%, transparent 75%)',
                filter: 'blur(50px)',
                zIndex: 0,
              }}
            />
            
            {/* Neutral Ambient Light Diffusion */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '40%',
                width: '70%',
                height: '70%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 30%, transparent 70%)',
                filter: 'blur(70px)',
                zIndex: 2,
              }}
            />

            {/* Mockup Container - Cinematic with Floating Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: [0, -2, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.3 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative"
              style={{ 
                width: '68%',
                maxWidth: '1200px',
                height: '48vh',
                minHeight: '480px',
                zIndex: 10,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Dramatic 3D Interface Container - "Sleeping" Perspective */}
                <motion.div
                initial={{ 
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{ 
                  opacity: heroOpacity,
                  scale: isHovered ? 1.01 : 1,
                }}
                transition={{ 
                  opacity: {
                    duration: 0.8,
                    delay: 0.4
                  },
                  scale: {
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                  style={{
                    transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  filter: `blur(${heroBlur}px)`,
                  transform: isHovered 
                    ? 'rotateX(10deg) rotateY(-4deg) translateZ(8px)' 
                    : 'rotateX(10deg) rotateY(-4deg)',
                  transition: 'transform 0.6s cubic-bezier(.25, .46, .45, .94)',
                  willChange: 'transform, opacity, filter',
                }}
                className="relative"
              >
                {/* Soft white ambient glow */}
                <div
                  className="absolute pointer-events-none rounded-12"
                    style={{
                    inset: '-40px',
                    background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.06) 40%, transparent 75%)',
                    filter: 'blur(80px)',
                    zIndex: -1,
                  }}
                />

                {/* Main Interface Container - Enhanced Depth & Glow */}
                <div
                  className="h-full rounded-12 overflow-hidden"
                  style={{
                    background: '#08090a',
                    border: '0.5px solid rgba(55, 57, 58, 0.8)',
                    boxShadow: `
                      0 60px 120px rgba(0, 0, 0, 0.9),
                      0 20px 60px rgba(0, 0, 0, 0.4),
                      0 0 0 1px rgba(255, 255, 255, 0.03) inset,
                      0 1px 1px rgba(255, 255, 255, 0.06) inset
                    `,
                    position: 'relative',
                  }}
                >
                  {/* Soft white screen glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 100% 80% at 50% 25%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 30%, transparent 70%)',
                      borderRadius: '12px',
                    }}
                  />

                  {/* Minimal Header */}
                  <div 
                    className="px-8 py-4 border-b flex items-center justify-between relative z-10"
                    style={{ 
                      borderColor: '#37393a',
                      background: 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-small font-semibold" style={{ color: '#f7f8f8' }}>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#8a8f98' }}>
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span className="text-micro" style={{ color: '#8a8f98' }}>Just now</span>
                    </div>
                  </div>

                  {/* Realistic Dashboard Content - Two Panel Layout */}
                  <div className="h-full flex p-8 relative" style={{ height: 'calc(100% - 64px)' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="h-full flex gap-6 w-full"
                    >
                      {/* Left Panel - Career Progress Overview */}
                      <div className="flex-1 flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-large font-semibold mb-1" style={{ color: '#f7f8f8' }}>Career Progress</h3>
                          <p className="text-micro" style={{ color: '#8a8f98' }}>Software Engineering Path</p>
                        </div>

                        {/* Circular Progress Indicator */}
                        <div className="flex items-center justify-center mb-6" style={{ minHeight: '200px' }}>
                          <div className="relative" style={{ width: '180px', height: '180px' }}>
                            {/* Background Circle */}
                            <svg width="180" height="180" viewBox="0 0 180 180" className="absolute">
                              <circle
                                cx="90" cy="90"
                                r="80"
                                fill="none"
                                stroke="#23252a"
                                strokeWidth="8"
                              />
                            </svg>
                            {/* Animated Progress Circle */}
                            <svg width="180" height="180" viewBox="0 0 180 180" className="absolute transform -rotate-90">
                              <motion.circle
                                cx="90" cy="90"
                                r="80"
                                fill="none"
                                stroke="#7170ff"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={502.4}
                                initial={{ strokeDashoffset: 502.4 }}
                                animate={{ strokeDashoffset: 502.4 * (1 - 0.72) }}
                                transition={{ duration: 1.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                              />
                            </svg>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <motion.span
                                className="text-title-3 font-semibold"
                                style={{ color: '#f7f8f8' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8 }}
                              >
                                72%
                              </motion.span>
                              <span className="text-micro" style={{ color: '#8a8f98' }}>Complete</span>
                            </div>
                          </div>
                        </div>

                        {/* Next Milestone */}
                        <div className="p-4 rounded-8" style={{ background: '#1c1c1f', border: '0.5px solid #23252a' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#7170ff' }}>
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span className="text-small font-medium" style={{ color: '#d0d6e0' }}>Next milestone</span>
                          </div>
                          <p className="text-micro" style={{ color: '#f7f8f8' }}>Build Portfolio Project</p>
                          <p className="text-micro mt-1" style={{ color: '#8a8f98' }}>Due in 3 days</p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ width: '0.5px', background: '#23252a' }}></div>

                      {/* Right Panel - Recent Activity */}
                      <div className="flex-1 flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-large font-semibold mb-1" style={{ color: '#f7f8f8' }}>Recent Activity</h3>
                          <p className="text-micro" style={{ color: '#8a8f98' }}>Your learning updates</p>
                        </div>

                        <div className="space-y-2 flex-1">
                          {[
                            { status: 'completed', title: 'React Roadmap', item: 'Completed', color: '#7170ff' },
                            { status: 'new', title: 'New Skill Added', item: 'Python', color: '#22c55e' },
                            { status: 'active', title: 'Started', item: 'ML Basics', color: '#f97316' },
                            { status: 'completed', title: 'Node.js Fundamentals', item: 'Completed', color: '#7170ff' }
                          ].map((activity, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.4 + i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="flex items-center gap-3 p-3 rounded-8 hover:bg-bg-tertiary transition-colors cursor-pointer"
                              style={{ border: '0.5px solid transparent' }}
                            >
                              {/* Status Indicator */}
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: activity.color, boxShadow: `0 0 6px ${activity.color}40` }}
                              ></div>
                              
                              {/* Content */}
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-small font-medium" style={{ color: '#f7f8f8' }}>{activity.title}</span>
                                </div>
                                <div className="text-micro" style={{ color: '#d0d6e0' }}>{activity.item}</div>
                              </div>

                              {/* Status Icon */}
                              <div className="flex-shrink-0">
                                {activity.status === 'completed' ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#7170ff' }}>
                                    <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                                ) : activity.status === 'new' ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#22c55e' }}>
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="8" x2="12" y2="16"/>
                                    <line x1="8" y1="12" x2="16" y2="12"/>
                                  </svg>
                                ) : (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#f97316' }}>
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12 6 12 12 16 14"/>
                                  </svg>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Full Viewport */}
      <section className="relative flex items-center border-t border-border-primary" style={{ minHeight: '100vh' }}>
        <div className="w-full px-6 py-24">
          <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 
                className="text-title-5 font-semibold mb-4 text-white"
                style={{ letterSpacing: '-.022em' }}
              >
                How it works
              </h2>
              <p className="text-large text-text-secondary max-w-2xl mx-auto">
                Three simple steps to accelerate your career journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: '01',
                  title: 'Choose your path',
                  description: 'Select from hundreds of career paths across technology, healthcare, business, and more',
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="10 8 16 12 10 16 10 8"/>
                    </svg>
                  )
                },
                {
                  step: '02',
                  title: 'Get your roadmap',
                  description: 'Receive a personalized learning roadmap with milestones, resources, and timelines',
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  )
                },
                {
                  step: '03',
                  title: 'Track progress',
                  description: 'Monitor your growth with interactive flowcharts and achievement tracking',
                  icon: (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 11 12 2 2 11"/>
                      <path d="M2 11v10a1 1 0 001 1h5"/>
                      <path d="M22 21v-10l-10-9"/>
                    </svg>
                  )
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.15, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                >
                  <div className="text-accent-hover mb-6">
                    {item.icon}
                  </div>
                  <div 
                    className="text-micro font-semibold mb-3 text-text-quaternary"
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-title-2 font-semibold mb-3 text-white" style={{ letterSpacing: '-.012em' }}>
                    {item.title}
                  </h3>
                  <p className="text-regular text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
              </motion.div>
              ))}
            </div>
          </div>
        </div>
        </section>

      {/* Popular Careers Section - Cinematic Storytelling Layout */}
      <section 
        id="explore"
        className="relative border-t border-border-primary" 
        style={{ minHeight: '100vh', paddingBottom: '0' }}
      >
        {/* Neutral Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '80%',
              height: '80%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
        </div>

        <div className="w-full px-6 py-24 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-16"
            >
              <h2 
                className="text-title-5 font-semibold mb-4 text-white"
                style={{ letterSpacing: '-.022em' }}
              >
                Popular career paths
              </h2>
              <p className="text-large text-text-secondary max-w-2xl mx-auto">
                Explore in-demand careers with personalized learning roadmaps
              </p>
            </motion.div>

            {/* Horizontal Scroll Container with Snap */}
            <div 
              ref={carouselRef}
              className="overflow-x-auto pb-12"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Hide scrollbar */}
              <style>{`
                .overflow-x-auto::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {/* Cards Container */}
              <div className="flex gap-6" style={{ minWidth: 'max-content' }}>
                {popularCareers.map((career, index) => (
                  <div key={index} style={{ flex: '0 0 auto', width: 'calc(50vw - 48px)', minWidth: '400px' }}>
                    <CareerScene 
                      career={career} 
                      index={index}
                      onSelect={handleQuickSelect}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Scroll Controls & Explore More */}
            <motion.div 
              className="flex items-center justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Scroll Indicator */}
              <div className="flex items-center gap-2">
                {popularCareers.map((_, i) => (
                  <motion.button
                    key={i}
                    className="h-1 rounded-full transition-all cursor-pointer focus:outline-none"
                    animate={{
                      width: i === activeCareerIndex ? 32 : 8,
                      background: i === activeCareerIndex ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      background: 'rgba(255,255,255,0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    onClick={() => {
                      if (carouselRef.current) {
                        const cardWidth = carouselRef.current.scrollWidth / popularCareers.length;
                        carouselRef.current.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                      }
                    }}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-16 bg-border-primary" />

              {/* Explore More Button */}
              <motion.button
                onClick={() => {
                  const categorySection = document.getElementById('category-explorer');
                  if (categorySection) {
                    categorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="flex items-center gap-2 text-small font-medium text-text-secondary hover:text-text-primary transition-colors group focus:outline-none"
                whileHover={{ gap: '8px' }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span>Explore more categories</span>
                <motion.svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-text-tertiary group-hover:text-text-primary transition-colors"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path d="m9 18 6-6-6-6"/>
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Explorer Section - Full Viewport */}
      <section id="category-explorer" className="relative flex items-center border-t border-border-primary" style={{ minHeight: '100vh' }}>
        <div className="w-full px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-title-4 font-semibold mb-4 text-white" style={{ letterSpacing: '-.022em' }}>
                Explore by category
              </h2>
              <p className="text-regular text-text-secondary">
                Navigate through our comprehensive career system
              </p>
            </motion.div>
            
            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-2">
                {['categories', 'fields', 'specializations'].map((step, index) => {
                  const isActive = activeTab === step;
                  const isCompleted = 
                    (activeTab === 'fields' && step === 'categories') ||
                    (activeTab === 'specializations' && (step === 'categories' || step === 'fields'));
                  
                  return (
                    <div key={step} className="flex items-center">
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-micro font-semibold"
                        style={{
                          background: isActive || isCompleted ? 'var(--color-brand-bg)' : 'var(--color-bg-tertiary)',
                          color: isActive || isCompleted ? 'white' : 'var(--color-text-tertiary)',
                          transition: 'all 0.16s cubic-bezier(.25, .46, .45, .94)',
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {index + 1}
                      </motion.div>
                      {index < 2 && (
                        <div 
                          className="w-12 h-0.5 mx-2"
                          style={{
                            background: isCompleted ? 'var(--color-brand-bg)' : 'var(--color-border-primary)',
                            transition: 'background 0.16s cubic-bezier(.25, .46, .45, .94)',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'categories' && (
                  <motion.div
                    key="categories"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {categories.map((category, index) => (
                    <motion.div 
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <LinearCard
                          onClick={() => handleCategorySelect(category.id)}
                        className="p-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
                          <div className="flex-grow">
                            <div className="text-small font-medium text-text-primary">
                              {category.name}
                            </div>
                            <div className="text-micro text-text-tertiary">
                              {category.description}
                            </div>
                          </div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-quaternary">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                          </div>
                      </LinearCard>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
                
                {activeTab === 'fields' && (
                  <motion.div
                    key="fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6 text-center">
                    <LinearButton variant="ghost" size="small" onClick={resetSelection}>
                      ← Back to categories
                    </LinearButton>
                      </div>
                      
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {fields.map((field, index) => (
                        <motion.div
                          key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <LinearCard
                          onClick={() => handleFieldSelect(field)}
                          className="p-4 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-small font-medium text-text-primary">{field}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-quaternary">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </div>
                        </LinearCard>
                        </motion.div>
                      ))}
                  </div>
                  </motion.div>
                )}
                
                {activeTab === 'specializations' && (
                  <motion.div
                    key="specializations"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6 text-center">
                    <LinearButton variant="ghost" size="small" onClick={() => setActiveTab('fields')}>
                      ← Back to fields
                    </LinearButton>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {domains.map((domain, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <LinearCard
                          onClick={() => handleDomainSelect(domain)}
                          className="p-4 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-small font-medium text-text-primary">{domain}</span>
                            <LinearButton variant="ghost" size="mini">
                              Explore
                            </LinearButton>
                          </div>
                        </LinearCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
                        </div>
      </section>

      {/* Stats Section - Full Viewport */}
      <section className="relative flex items-center border-t border-border-primary" style={{ minHeight: '100vh' }}>
        <div className="w-full px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-title-5 font-semibold mb-6 text-white" style={{ letterSpacing: '-.022em' }}>
                  Trusted by students worldwide
                </h2>
                <p className="text-xl text-text-secondary mb-12 leading-relaxed">
                  Join thousands of students who've discovered their perfect career path with our AI-powered guidance platform.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: '50K+', label: 'Students guided' },
                    { value: '200+', label: 'Career paths' },
                    { value: '95%', label: 'Success rate' },
                    { value: '24/7', label: 'AI assistance' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="text-title-4 font-semibold text-accent-hover mb-2">
                        {stat.value}
                      </div>
                      <div className="text-regular text-text-tertiary">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                    </div>
              </motion.div>
                    
                    <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div 
                  className="rounded-12 p-8"
                  style={{
                    background: 'linear-gradient(135deg, rgba(113, 112, 255, 0.1), rgba(94, 106, 210, 0.05))',
                    border: '0.5px solid rgba(113, 112, 255, 0.2)',
                  }}
                >
                  <div className="space-y-6">
                    {[
                      { name: 'Alex Kumar', role: 'Software Engineer', feedback: 'Found my dream career in just 3 months!' },
                      { name: 'Priya Singh', role: 'Data Scientist', feedback: 'The roadmap was exactly what I needed' },
                      { name: 'Rahul Sharma', role: 'UI/UX Designer', feedback: 'Best career guidance platform out there' }
                    ].map((testimonial, index) => (
                        <motion.div
                          key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="p-4 rounded-8"
                          style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '0.5px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <p className="text-small text-text-secondary mb-3">"{testimonial.feedback}"</p>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-micro font-semibold"
                            style={{ background: 'var(--color-brand-bg)', color: 'white' }}
                          >
                            {testimonial.name[0]}
                          </div>
                          <div>
                            <div className="text-small font-medium text-text-primary">{testimonial.name}</div>
                            <div className="text-micro text-text-tertiary">{testimonial.role}</div>
                          </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
                  </motion.div>
            </div>
            </div>
          </div>
        </section>

      {/* Final CTA Section - Full Viewport */}
      <section className="relative flex items-center border-t border-border-primary" style={{ minHeight: '100vh' }}>
        <div className="w-full px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-title-6 font-semibold mb-6 text-white"
                style={{ letterSpacing: '-.022em' }}
              >
                Ready to start your journey?
              </h2>
              <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students discovering their perfect career path with personalized AI guidance
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <LinearButton
                  variant="primary"
                  size="large"
                  onClick={() => navigate('/career-path')}
                >
                  Explore careers
                </LinearButton>
                <LinearButton
                  variant="secondary"
                  size="large"
                  onClick={() => scrollToSection('explore')}
                >
                  Learn more
                </LinearButton>
              </div>
            </motion.div>
          </div>
      </div>
      </section>
    </div>
  );
};

export default Landing;
