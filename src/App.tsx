import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load pages for better performance
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Bookshelf = lazy(() => import('./pages/Bookshelf'));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* Header */}
        <header className="bg-background">
          <div className="container mx-auto px-10">
            {/* Profile Section */}
            <div className="flex items-center justify-between pt-6 pb-0">
              <div className="flex items-center gap-4">
                <img 
                  src="/header.png" 
                  alt="Aidan Andrews" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                />
                <div>
                  <h1 className="text-lg font-bold">Aidan Andrews</h1>
                  <p className="text-sm opacity-75">Physics and Machine Learning Enthusiast</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-3 pb-0">
                <a href="mailto:aidansa2@illinois.edu" className="hover:text-[var(--color-primary)] transition-colors">
                  <span className="sr-only">Email</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a href="https://github.com/aidanandrews22" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/aidanandrewss" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="sticky top-0 border-b border-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-center py-3">
              <div className="flex gap-8">
                <a href="/about" className="hover:text-[var(--color-primary)] transition-colors">About</a>
                <a href="/projects" className="hover:text-[var(--color-primary)] transition-colors">Projects</a>
                <a href="/blog" className="hover:text-[var(--color-primary)] transition-colors">Blog</a>
                <a href="/bookshelf" className="hover:text-[var(--color-primary)] transition-colors">Bookshelf</a>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/bookshelf" element={<Bookshelf />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}