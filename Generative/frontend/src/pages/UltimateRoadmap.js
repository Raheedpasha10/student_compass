import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { careerAPI } from '../services/api';
import LinearButton from '../components/LinearButton';
import LinearCard from '../components/LinearCard';
import LoadingSpinner from '../components/LoadingSpinner';

const SimplifiedUltimateRoadmap = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [usingDemoData, setUsingDemoData] = useState(false);
  
  const navigate = useNavigate();
  const { currentSkills, currentExpertise } = useAppContext();

  // Fetch roadmap data
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingDemoData(false);
        
        if (!currentSkills || !currentExpertise) {
          throw new Error('Skills and expertise are required to generate a personalized roadmap');
        }
        
        const data = await careerAPI.analyzeCareer(currentSkills, currentExpertise);
        setRoadmapData(data);
      } catch (err) {
        console.error('Error fetching roadmap data:', err);
        setUsingDemoData(true);
        if (!err.message.includes('Network Error') && !err.message.includes('Unable to connect')) {
          setError(err.message || 'Failed to fetch roadmap data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (currentSkills && currentExpertise) {
      fetchRoadmapData();
    } else {
        setError('Please provide your skills and expertise level to generate a personalized roadmap.');
      setLoading(false);
    }
  }, [currentSkills, currentExpertise]);

  // Fetch resources (YouTube, books, etc.)
  const fetchResources = async (type) => {
    setLoadingResources(true);
    setSelectedResource(type);
    
    try {
      // Simulated resource fetching - replace with actual API calls
      const demoResources = {
        youtube: [
          { title: `${currentSkills} Complete Course`, channel: 'TechAcademy', url: '#' },
          { title: `Master ${currentSkills} in 2024`, channel: 'LearnTech', url: '#' },
          { title: `${currentSkills} Tutorial for Beginners`, channel: 'CodeMaster', url: '#' }
        ],
        books: [
          { title: `Complete Guide to ${currentSkills}`, author: 'Tech Expert', link: '#' },
          { title: `${currentSkills} Fundamentals`, author: 'Learning Pro', link: '#' }
        ],
        certifications: [
          { name: `Professional ${currentSkills} Certificate`, provider: 'Coursera', link: '#' },
          { name: `${currentSkills} Certification`, provider: 'Udemy', link: '#' }
        ],
        courses: [
          { title: `Complete ${currentSkills} Bootcamp`, platform: 'Udemy', link: '#' },
          { title: `${currentSkills} Masterclass`, platform: 'Coursera', link: '#' }
        ]
      };
      
      setResources(demoResources[type] || []);
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoadingResources(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary pt-16 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Generating your personalized roadmap..." />
        </div>
    );
  }

  if (error && !usingDemoData) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
        <div className="linear-container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-title-3 font-semibold mb-4">Unable to load roadmap</h2>
            <p className="text-regular text-text-secondary mb-8">{error}</p>
            <LinearButton variant="primary" onClick={() => navigate('/')}>
              Go back home
            </LinearButton>
          </div>
        </div>
      </div>
    );
  }

  const displayRoadmap = roadmapData || {
    career_path: currentSkills || 'Your Career Path',
    expertise_level: currentExpertise || 'Beginner',
    learning_path: [
      { phase: 'Foundation', duration: '3 months', topics: ['Basics', 'Core Concepts', 'Best Practices'] },
      { phase: 'Intermediate', duration: '6 months', topics: ['Advanced Topics', 'Real Projects', 'Industry Tools'] },
      { phase: 'Expert', duration: '12+ months', topics: ['Specialization', 'Complex Systems', 'Leadership'] }
    ]
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
      {/* Header */}
      <section className="py-12 border-b border-border-primary">
        <div className="linear-container">
          <div className="max-w-3xl">
            {usingDemoData && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <span 
                  className="inline-flex items-center gap-2 px-2 py-1 rounded-6 text-micro font-medium"
                  style={{ 
                    background: 'rgba(252, 120, 64, 0.15)',
                    color: '#fc7840',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#fc7840' }}></span>
                  Using demo data
                </span>
              </motion.div>
            )}

            <h1 className="text-title-4 font-semibold mb-3" style={{ letterSpacing: '-.022em' }}>
              {displayRoadmap.career_path}
              </h1>
            <p className="text-regular text-text-secondary mb-4">
              Personalized learning path for {displayRoadmap.expertise_level} level
            </p>
            
            <div className="flex gap-2">
              <LinearButton variant="secondary" size="small" onClick={() => navigate('/career-path')}>
                ← Change career
              </LinearButton>
              <LinearButton variant="secondary" size="small" onClick={() => navigate('/flowchart')}>
                View flowchart →
              </LinearButton>
            </div>
          </div>
              </div>
      </section>

      {/* Learning Path */}
      <section className="py-12">
        <div className="linear-container">
          <div className="max-w-3xl">
            <h2 className="text-title-2 font-semibold mb-8" style={{ letterSpacing: '-.012em' }}>
              Learning path
                  </h2>

            <div className="space-y-3">
              {displayRoadmap.learning_path?.map((phase, index) => (
                <motion.div
                    key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <LinearCard className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-regular font-semibold text-text-primary mb-1">
                          {phase.phase}
                        </h3>
                        <p className="text-small text-text-tertiary">
                          Duration: {phase.duration}
                        </p>
                      </div>
                            <span 
                        className="text-micro font-semibold px-2 py-1 rounded-6"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--color-text-tertiary)'
                        }}
                      >
                        Phase {index + 1}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {phase.topics?.map((topic, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-2 text-small text-text-secondary"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent"></span>
                          {topic}
                        </div>
                      ))}
                    </div>
                  </LinearCard>
                </motion.div>
              ))}
                    </div>
                  </div>
                          </div>
      </section>

      {/* Resources */}
      <section className="py-12 border-t border-border-primary">
        <div className="linear-container">
          <div className="max-w-3xl">
            <h2 className="text-title-2 font-semibold mb-6" style={{ letterSpacing: '-.012em' }}>
              Learning resources
            </h2>

            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { type: 'youtube', label: 'YouTube Videos', icon: '📺' },
                { type: 'books', label: 'Books', icon: '📚' },
                { type: 'certifications', label: 'Certifications', icon: '🎓' },
                { type: 'courses', label: 'Courses', icon: '💻' }
              ].map(({ type, label, icon }) => (
                <LinearButton
                  key={type}
                  variant={selectedResource === type ? 'secondary' : 'tertiary'}
                  size="small"
                  onClick={() => fetchResources(type)}
                >
                  <span className="mr-1.5">{icon}</span>
                  {label}
                </LinearButton>
                      ))}
                    </div>

            {loadingResources && (
              <div className="py-8">
                <LoadingSpinner size="md" text="Loading resources..." />
                  </div>
                )}

            {!loadingResources && resources.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedResource}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  {resources.map((resource, index) => (
                    <motion.div
                          key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <LinearCard className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-small font-medium text-text-primary mb-1">
                              {resource.title || resource.name}
                            </h4>
                            <p className="text-micro text-text-tertiary">
                              {resource.channel || resource.author || resource.provider || resource.platform}
                            </p>
                          </div>
                          <LinearButton
                            variant="ghost"
                            size="mini"
                            onClick={() => window.open(resource.url || resource.link, '_blank')}
                          >
                            View →
                          </LinearButton>
                        </div>
                      </LinearCard>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border-primary">
        <div className="linear-container text-center">
          <h2 className="text-title-3 font-semibold mb-4">
            Ready to start learning?
              </h2>
          <p className="text-regular text-text-secondary mb-8 max-w-2xl mx-auto">
            Follow this roadmap to master {currentSkills} and achieve your career goals
          </p>
          <LinearButton variant="primary" size="large" onClick={() => navigate('/flowchart')}>
            View interactive flowchart
          </LinearButton>
        </div>
      </section>
    </div>
  );
};

export default SimplifiedUltimateRoadmap;
