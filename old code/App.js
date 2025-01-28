import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import About from './pages/About';
import Blog from './pages/Blog';
import Notes from './pages/Notes';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Bookshelf from './pages/Bookshelf';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import { useAppContext } from './context/AppContext';
import { DataProvider } from './context/DataContext';

const AppContent = () => {
  const { loading, error } = useAppContext();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Header />
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/notes/*" element={<Notes />} />
          <Route path="/projects/*" element={<Projects />} />
          <Route path="/assets/*" />
          <Route path="/skills" element={<Skills />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AppProvider>
  );
}

export default App;