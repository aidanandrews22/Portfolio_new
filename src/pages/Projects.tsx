import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FilterDropdown from '../components/FilterDropdown';

interface Project {
  id: string;
  title: string;
  description: string;
  demoLink?: string;
  githubLink?: string;
  tags: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter(project => project.tags.includes(selectedTag));
  }, [projects, selectedTag]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
        <p className="text-lg text-red-500">Error: {error}</p>
        <p className="text-sm">Please try refreshing the page</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">No projects found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Projects</h1>
        <FilterDropdown
          options={availableTags}
          selectedOption={selectedTag}
          onSelect={setSelectedTag}
          label="Filter by Tag"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors group cursor-pointer"
            onClick={() => window.location.href = `/projects/${project.id}`}
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">{project.title}</h2>
              <p className="mb-4 text-sm/relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.githubLink && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.githubLink, '_blank', 'noopener noreferrer');
                    }}
                    className="text-sm hover:text-[var(--color-primary)] transition-colors"
                  >
                    GitHub →
                  </button>
                )}
                {project.demoLink && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.demoLink, '_blank', 'noopener noreferrer');
                    }}
                    className="text-sm hover:text-[var(--color-primary)] transition-colors"
                  >
                    Live Demo →
                  </button>
                )}
                <span 
                  className="text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                >
                  View Details →
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
} 
