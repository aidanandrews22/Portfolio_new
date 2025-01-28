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
        <nav className="p-4 sticky top-0 backdrop-blur-sm border-b border-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
          <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-xl font-bold">Aidan Andrews</a>
            <div className="flex gap-4">
              <a href="/about" className="hover:text-[var(--color-primary)] transition-colors">About</a>
              <a href="/projects" className="hover:text-[var(--color-primary)] transition-colors">Projects</a>
              <a href="/blog" className="hover:text-[var(--color-primary)] transition-colors">Blog</a>
              <a href="/bookshelf" className="hover:text-[var(--color-primary)] transition-colors">Bookshelf</a>
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