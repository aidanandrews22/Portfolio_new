import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched projects:', data); // Debug log
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
      <h1 className="text-4xl font-bold">Projects</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
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

            <div className="flex gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[var(--color-primary)] transition-colors"
                >
                  GitHub →
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[var(--color-primary)] transition-colors"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
} 
