import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { careerAPI } from '../services/api';
import LinearButton from '../components/LinearButton';
import LinearCard from '../components/LinearCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Flowchart = () => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const navigate = useNavigate();
  const { currentSkills, currentExpertise } = useAppContext();

  // Fetch roadmap data
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!currentSkills || !currentExpertise) {
          throw new Error('Skills and expertise are required to generate a roadmap');
        }
        
        const data = await careerAPI.analyzeCareer(currentSkills, currentExpertise);
        
        if (!data || !data.roadmap) {
          throw new Error('Invalid response from server. Please try again.');
        }
        
        setRoadmapData(data);
      } catch (err) {
        console.error('Error fetching roadmap data:', err);
        if (err.message.includes('Network Error')) {
          setError('Unable to connect to the server. Please check your internet connection.');
        } else {
          setError(err.message || 'Failed to fetch roadmap data. Please try again.');
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

  // Load completed steps from localStorage
  useEffect(() => {
    if (currentSkills) {
      const saved = localStorage.getItem(`completedSteps_${currentSkills}`);
      if (saved) {
        try {
          setCompletedSteps(new Set(JSON.parse(saved)));
        } catch (e) {
          setCompletedSteps(new Set());
        }
      }
    }
  }, [currentSkills]);

  // Save completed steps to localStorage
  useEffect(() => {
    if (currentSkills) {
      localStorage.setItem(`completedSteps_${currentSkills}`, JSON.stringify([...completedSteps]));
    }
  }, [completedSteps, currentSkills]);

  // Toggle step completion with sequential logic
  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(stepIndex)) {
        newSet.delete(stepIndex);
        return newSet;
      }
      
      if (stepIndex === 0 || newSet.has(stepIndex - 1)) {
        newSet.add(stepIndex);
      }
      
      return newSet;
    });
  };

  // Reset progress
  const resetProgress = () => {
    setCompletedSteps(new Set());
    if (currentSkills) {
      localStorage.removeItem(`completedSteps_${currentSkills}`);
    }
  };

  // Get progress message
  const getProgressMessage = () => {
    if (!roadmapData?.roadmap) return '';
    
    const totalSteps = roadmapData.roadmap.length;
    const completed = completedSteps.size;
    const percentage = Math.round((completed / totalSteps) * 100);
    
    if (completed === 0) return "Start your journey by completing the first step";
    if (completed === totalSteps) return "Congratulations! You've completed your entire learning path";
    if (percentage >= 75) return "Almost there! Just a few more steps to go";
    if (percentage >= 50) return "You're halfway there! Keep going";
    return "Keep going, you're making progress";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary pt-16 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Generating your learning flowchart..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
        <div className="linear-container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-title-3 font-semibold mb-4">Unable to load flowchart</h2>
            <p className="text-regular text-text-secondary mb-8">{error}</p>
            <LinearButton variant="primary" onClick={() => navigate('/')}>
              Go back home
            </LinearButton>
          </div>
        </div>
      </div>
    );
  }

  const totalSteps = roadmapData?.roadmap?.length || 0;
  const completedCount = completedSteps.size;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-16">
      {/* Header with Progress */}
      <section className="py-12 border-b border-border-primary">
        <div className="linear-container">
          <div className="max-w-3xl">
            <h1 className="text-title-4 font-semibold mb-3" style={{ letterSpacing: '-.022em' }}>
              {roadmapData?.career_path || currentSkills} Learning Path
            </h1>
            <p className="text-regular text-text-secondary mb-6">
              {getProgressMessage()}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-small text-text-tertiary">
                  {completedCount} of {totalSteps} completed
                </span>
                <span className="text-small font-semibold text-text-secondary">
                  {progressPercent}%
                </span>
              </div>
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'var(--color-bg-tertiary)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--color-accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <LinearButton variant="secondary" size="small" onClick={() => navigate('/simplified-ultimate-roadmap')}>
                ← View roadmap
              </LinearButton>
              {completedCount > 0 && (
                <LinearButton variant="ghost" size="small" onClick={resetProgress}>
                  Reset progress
                </LinearButton>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Steps */}
      <section className="py-12">
        <div className="linear-container">
          <div className="max-w-3xl">
            <div className="space-y-6 relative">
              {roadmapData?.roadmap?.map((step, index) => {
                const isCompleted = completedSteps.has(index);
                const isUnlocked = index === 0 || completedSteps.has(index - 1);
                const isLocked = !isUnlocked;
                const isLast = index === (roadmapData?.roadmap?.length || 0) - 1;

                return (
                  <div key={index} className="relative">
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="absolute left-[23px] top-[48px] bottom-[-24px] w-0.5 z-0" style={{ background: 'var(--color-border-primary)' }}>
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full bg-accent"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: isCompleted ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ transformOrigin: 'top' }}
                        />
                      </div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                      className="relative z-10"
                    >
                      <LinearCard 
                        className={`p-6 ${isUnlocked ? 'cursor-pointer' : 'opacity-50'} relative`}
                        onClick={() => isUnlocked && toggleStepCompletion(index)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Step Number/Checkbox */}
                          <div className="flex-shrink-0 mt-1 relative z-10">
                          <motion.button
                            className={`
                              w-6 h-6 rounded-full flex items-center justify-center
                              border-2 transition-regular
                            `}
                            style={{
                              borderColor: isCompleted ? 'var(--color-accent)' : 'var(--color-border-tertiary)',
                              background: isCompleted ? 'var(--color-accent)' : 'transparent',
                            }}
                            whileHover={isUnlocked ? { scale: 1.1 } : {}}
                            whileTap={isUnlocked ? { scale: 0.95 } : {}}
                            disabled={isLocked}
                          >
                            {isCompleted ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            ) : isLocked ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-quaternary">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                            ) : (
                              <span className="text-micro font-semibold text-text-tertiary">
                                {index + 1}
                              </span>
                            )}
                          </motion.button>
                        </div>

                        {/* Step Content */}
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-2">
                            <h3 
                              className={`
                                text-regular font-semibold
                                ${isCompleted ? 'text-text-tertiary line-through' : 'text-text-primary'}
                                ${isLocked ? 'text-text-quaternary' : ''}
                              `}
                            >
                              {step.title || step.step || `Step ${index + 1}`}
                            </h3>
                            {isCompleted && (
                              <span 
                                className="text-micro font-medium px-2 py-0.5 rounded-6"
                                style={{ 
                                  background: 'rgba(113, 112, 255, 0.15)',
                                  color: 'var(--color-accent-hover)',
                                }}
                              >
                                Done
                              </span>
                            )}
                          </div>

                          {step.description && (
                            <p 
                              className={`
                                text-small mb-3
                                ${isCompleted ? 'text-text-quaternary' : 'text-text-tertiary'}
                              `}
                            >
                              {step.description}
                            </p>
                          )}

                          {step.resources && step.resources.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {step.resources.map((resource, i) => (
                                <span 
                                  key={i}
                                  className="text-micro px-2 py-1 rounded-6"
                                  style={{ 
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    color: 'var(--color-text-tertiary)'
                                  }}
                                >
                                  {resource}
                                </span>
                              ))}
                            </div>
                          )}

                          {step.duration && (
                            <div className="flex items-center gap-1.5 text-micro text-text-quaternary mt-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                              </svg>
                              {step.duration}
                            </div>
                          )}
                        </div>
                      </div>
                    </LinearCard>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Completion Message */}
            {completedCount === totalSteps && totalSteps > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mt-12 text-center"
              >
                <motion.div 
                  className="mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                >
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto text-accent-hover">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </motion.div>
                <motion.h2 
                  className="text-title-3 font-semibold mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Congratulations!
                </motion.h2>
                <motion.p 
                  className="text-regular text-text-secondary mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  You've completed your entire learning path for {currentSkills}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <LinearButton variant="primary" size="large" onClick={() => navigate('/')}>
                    Explore more careers
                  </LinearButton>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Flowchart;
