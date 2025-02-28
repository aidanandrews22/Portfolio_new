import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';

// Lazy load pages for better performance
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Bookshelf = lazy(() => import('./pages/Bookshelf'));
const ProjectView = lazy(() => import('./pages/ProjectView'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Header = lazy(() => import('./components/Header'));
const NavigationBar = lazy(() => import('./components/NavigationBar'));

export default function App() {
  // Apply color scheme adaptive class to html element
  useEffect(() => {
    // Add class to enable adaptive theming
    document.documentElement.classList.add('color-scheme-adaptive');
    
    // Setup media query listener for dark mode changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to update theme variables when system preference changes
    const handleColorSchemeChange = () => {
      if (darkModeMediaQuery.matches) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
      } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
      }
    };
    
    // Initial theme setup
    handleColorSchemeChange();
    
    // Add listener for system preference changes
    darkModeMediaQuery.addEventListener('change', handleColorSchemeChange);
    
    // Cleanup
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleColorSchemeChange);
      document.documentElement.classList.remove('color-scheme-adaptive');
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans prose-adaptive">
        <Header />
        <NavigationBar />
        
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectView />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/bookshelf" element={<Bookshelf />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}