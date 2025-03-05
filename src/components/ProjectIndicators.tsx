import React, { useState, useEffect } from 'react';
import { Brain, Rocket, Lightbulb } from 'lucide-react';
import '../styles/animations.css';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

// Generate a type-safe client for our Amplify backend
const client = generateClient<Schema>();

// Local storage key for indicators
const INDICATORS_KEY = 'projectIndicators';

type IndicatorType = 'clever' | 'launch' | 'inspired';

type AnimatedIndicatorProps = {
  icon: React.ElementType;
  label: string;
  color: string;
  animationClass: string;
  indicatorType: IndicatorType;
  projectId: string;
  compact?: boolean;
};

const AnimatedIndicator: React.FC<AnimatedIndicatorProps> = ({ 
  icon: Icon, 
  label, 
  color, 
  animationClass,
  indicatorType,
  projectId,
  compact = false
}) => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showCountIndicator, setShowCountIndicator] = useState<boolean>(false);
  hasInteracted;
  
  // Create a unique ID for this indicator
  const indicatorId = `${projectId}_${indicatorType}`;
  
  // Load initial state from localStorage
  useEffect(() => {
    try {
      const indicatorsJson = localStorage.getItem(INDICATORS_KEY);
      const indicators = indicatorsJson ? JSON.parse(indicatorsJson) : {};
      setHasInteracted(!!indicators[indicatorId]);
    } catch (err) {
      console.error('Error reading from localStorage:', err);
    }
  }, [indicatorId]);

  // Load the current count from the database
  useEffect(() => {
    let isMounted = true;
    
    async function fetchIndicatorCount() {
      if (!isMounted) return;
      setIsLoading(true);
      setError(null);
      
      try {
        // Try to find an existing indicator record
        const response = await client.models.ProjectIndicator.get({ id: indicatorId });
        
        if (isMounted) {
          if (response.data) {
            // Record exists, update the count
            setCount(response.data.count);
          } else {
            // No record exists yet, initialize with count=0
            setCount(0);
            
            // Create a new record silently (don't wait for it)
            client.models.ProjectIndicator.create({
              id: indicatorId,
              count: 0,
              indicatorType,
              projectId
            }).catch((err: Error) => {
              console.error(`Error creating initial ${indicatorType} indicator record:`, err);
            });
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error fetching ${indicatorType} indicator count:`, err);
          setError(`Could not load ${indicatorType} count. Please try again later.`);
          // Set to 0 on error to avoid showing loading state indefinitely
          setCount(0);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchIndicatorCount();
    
    return () => {
      isMounted = false;
    };
  }, [indicatorId, indicatorType, projectId]);
  
  const handleClick = async () => {
    if (isLoading) return;
    
    const currentCount = count ?? 0;
    const newCount = currentCount + 1;
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    // Show count indicator with animation
    setShowCountIndicator(true);
    setTimeout(() => {
      setShowCountIndicator(false);
    }, 2000);
    
    // Optimistically update UI
    setCount(newCount);
    setHasInteracted(true);
    setError(null);
    
    try {
      // Update localStorage
      const indicatorsJson = localStorage.getItem(INDICATORS_KEY);
      const indicators = indicatorsJson ? JSON.parse(indicatorsJson) : {};
      
      // Store the interaction for this indicator
      indicators[indicatorId] = true;
      localStorage.setItem(INDICATORS_KEY, JSON.stringify(indicators));
      
      // Update the database - use upsert pattern to handle both create and update
      await client.models.ProjectIndicator.update({
        id: indicatorId,
        count: newCount,
        indicatorType,
        projectId
      });
    } catch (err) {
      console.error(`Error updating ${indicatorType} indicator count:`, err);
      
      // Revert optimistic update on error
      setCount(currentCount);
      setError('Failed to update. Please try again.');
    }
  };
  
  return (
    <div className="flex items-center justify-center relative">
      <div className="relative flex items-center">
        {showCountIndicator && (
          <div className={`absolute -top-${compact ? '6' : '8'} left-${compact ? '3' : '5'} transform px-2 py-${compact ? '0.5' : '1'} rounded-full ${compact ? 'text-[10px]' : 'text-xs'} animate-fade-up`} style={{ color: color, fontWeight: 'bold' }}>
            +1
          </div>
        )}
        <div>
          <button 
            className={`flex items-center justify-center rounded-full ${compact ? 'p-2' : 'p-3'} transition-transform cursor-pointer ${isAnimating ? 'scale-110' : ''}`}
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            disabled={isLoading}
          >
            <Icon 
              stroke={color}
              size={compact ? 18 : 24}
              style={{ fill: 'none' }}
              className={`transition-all duration-300 ${isAnimating ? animationClass : ''}`}
            />
            
            {showTooltip && (
              <span className={`absolute left-0 bottom-full ${compact ? 'mb-1' : 'mb-2'} px-2 py-1 bg-gray-800 text-white ${compact ? 'text-[10px]' : 'text-xs'} rounded whitespace-nowrap z-10`}>
                {label}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></span>
              </span>
            )}
          </button>
        </div>
      
        {/* Counter - now horizontally aligned */}
        <div className={`ml-${compact ? '2' : '3'}`}>
          <span className={`font-medium ${compact ? 'text-xs' : 'text-sm'}`} style={{ color }}>
            {count}
          </span>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

// Main component with the three indicators
interface ProjectIndicatorsProps {
  projectId: string;
  compact?: boolean;
}

const ProjectIndicators: React.FC<ProjectIndicatorsProps> = ({ projectId, compact = false }) => {
  return (
    <div className={`flex items-center justify-center ${compact ? 'space-x-6' : 'space-x-10'}`}>
      <AnimatedIndicator 
        icon={Brain} 
        label="Clever" 
        color="#059669" 
        animationClass="animate-rotate"
        indicatorType="clever"
        projectId={projectId}
        compact={compact}
      />
      <AnimatedIndicator 
        icon={Rocket} 
        label="Launch It" 
        color="#8b5cf6" 
        animationClass="animate-fly-up"
        indicatorType="launch"
        projectId={projectId}
        compact={compact}
      />
      <AnimatedIndicator 
        icon={Lightbulb} 
        label="Inspired" 
        color="#f59e0b" 
        animationClass="animate-pulse-expand"
        indicatorType="inspired"
        projectId={projectId}
        compact={compact}
      />
    </div>
  );
};

export default ProjectIndicators;