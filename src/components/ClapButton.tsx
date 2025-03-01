import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

// Generate a type-safe client for our Amplify backend
const client = generateClient<Schema>();

// Local storage key for clapped posts
const CLAPPED_POSTS_KEY = 'clappedPosts';

interface ClapButtonProps {
  postId: string;
  className?: string;
  initialClaps?: number;
  onClap?: (newCount: number) => void;
}

const ClapButton: React.FC<ClapButtonProps> = ({ 
  postId,
  onClap 
}) => {
  const [clapCount, setClapCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasClapped, setHasClapped] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showClapIndicator, setShowClapIndicator] = useState<boolean>(false);
  const [clapIncrement, setClapIncrement] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  hasClapped; error;
  
  // Load initial state from localStorage
  useEffect(() => {
    try {
      const clappedPostsJson = localStorage.getItem(CLAPPED_POSTS_KEY);
      const clappedPosts = clappedPostsJson ? JSON.parse(clappedPostsJson) : {};
      // Store clap count per post ID in localStorage
      setHasClapped(!!clappedPosts[postId]);
    } catch (err) {
      console.error('Error reading from localStorage:', err);
    }
  }, [postId]);

  // Load the current clap count from the database
  useEffect(() => {
    let isMounted = true;
    
    async function fetchClapCount() {
      if (!isMounted) return;
      setIsLoading(true);
      setError(null);
      
      try {
        // Try to find an existing clap record for this post
        const response = await client.models.BlogPostLike.get({ id: postId });
        
        if (isMounted) {
          if (response.data) {
            // Record exists, update the clap count
            setClapCount(response.data.count);
          } else {
            // No record exists yet, initialize with count=0
            setClapCount(0);
            
            // Create a new record silently (don't wait for it)
            client.models.BlogPostLike.create({
              id: postId,
              count: 0
            }).catch((err: Error) => {
              console.error('Error creating initial clap record:', err);
            });
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching clap count:', err);
          setError('Could not load claps. Please try again later.');
          // Set to 0 on error to avoid showing loading state indefinitely
          setClapCount(0);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchClapCount();
    
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const handleClap = async () => {
    if (isLoading) return;
    
    const currentCount = clapCount ?? 0;
    const newCount = currentCount + 1;
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    // Show clap indicator
    setClapIncrement(prev => prev + 1);
    setShowClapIndicator(true);
    setTimeout(() => {
      setShowClapIndicator(false);
      setClapIncrement(0);
    }, 2000);
    
    // Optimistically update UI
    setClapCount(newCount);
    setHasClapped(true);
    setError(null);
    
    try {
      // Update localStorage
      const clappedPostsJson = localStorage.getItem(CLAPPED_POSTS_KEY);
      const clappedPosts = clappedPostsJson ? JSON.parse(clappedPostsJson) : {};
      
      // Store the clap count for this post
      clappedPosts[postId] = true;
      localStorage.setItem(CLAPPED_POSTS_KEY, JSON.stringify(clappedPosts));
      
      // Update the database - use upsert pattern to handle both create and update
      await client.models.BlogPostLike.update({
        id: postId,
        count: newCount
      });
      
      // Call the onClap callback if provided
      if (onClap) onClap(newCount);
    } catch (err) {
      console.error('Error updating clap count:', err);
      
      // Revert optimistic update on error
      setClapCount(currentCount);
      setError('Failed to update. Please try again.');
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center">
        <div className="relative">
          {showClapIndicator && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs animate-fade-up animate-fade-out">
              +{clapIncrement}
            </div>
          )}
          <div>
            <div aria-hidden="false">
              <button 
                className={`flex items-center justify-center rounded-full p-2 transition-colors cursor-pointer ${isAnimating ? 'scale-110' : ''} hover:bg-clap`}
                data-testid="headerClapButton"
                onClick={handleClap}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  aria-label="clap"
                  className={`${isAnimating ? 'text-primary' : 'text'}`}
                >
                  <path 
                    fillRule="evenodd" 
                    d="M11.37.828 12 3.282l.63-2.454zM15.421 1.84l-1.185-.388-.338 2.5zM9.757 1.452l-1.184.389 1.523 2.112zM20.253 11.84 17.75 7.438c-.238-.353-.57-.584-.93-.643a.96.96 0 0 0-.753.183 1.13 1.13 0 0 0-.443.695c.014.019.03.033.044.053l2.352 4.138c1.614 2.95 1.1 5.771-1.525 8.395a7 7 0 0 1-.454.415c.997-.13 1.927-.61 2.773-1.457 2.705-2.704 2.517-5.585 1.438-7.377M12.066 9.01c-.129-.687.08-1.299.573-1.773l-2.062-2.063a1.123 1.123 0 0 0-1.555 0 1.1 1.1 0 0 0-.273.521z" 
                    clipRule="evenodd"
                  />
                  <path 
                    fillRule="evenodd" 
                    d="M14.741 8.309c-.18-.267-.446-.455-.728-.502a.67.67 0 0 0-.533.127c-.146.113-.59.458-.199 1.296l1.184 2.503a.448.448 0 0 1-.236.755.445.445 0 0 1-.483-.248L7.614 6.106A.816.816 0 1 0 6.459 7.26l3.643 3.644a.446.446 0 1 1-.631.63L5.83 7.896l-1.03-1.03a.82.82 0 0 0-1.395.577.81.81 0 0 0 .24.576l1.027 1.028 3.643 3.643a.444.444 0 0 1-.144.728.44.44 0 0 1-.486-.098l-3.64-3.64a.82.82 0 0 0-1.335.263.81.81 0 0 0 .178.89l1.535 1.534 2.287 2.288a.445.445 0 0 1-.63.63l-2.287-2.288a.813.813 0 0 0-1.393.578c0 .216.086.424.238.577l4.403 4.403c2.79 2.79 5.495 4.119 8.681.931 2.269-2.271 2.708-4.588 1.342-7.086z" 
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-2">
        <div>
          <div aria-hidden="false">
            <p className="text-sm font-normal">
              <button 
                className="text hover:text-gray-800 relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {clapCount}
                {showTooltip && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                    Total claps
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></span>
                  </span>
                )}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClapButton;