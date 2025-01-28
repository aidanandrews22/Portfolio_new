import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProjectView from '../components/project/ProjectView';
import { fetchAllData } from '../services/DataService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const ProjectCard = ({ id, title, description, demoLink, githubLink, tags }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-6">
    <h3 className="text-xl font-semibold mb-2">
      <Link to={`/projects/${id}`} className="text-primary">{title}</Link>
    </h3>
    <p className="text-text-secondary mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags && tags.map((tag, index) => (
        <span key={index} className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-sm">{tag}</span>
      ))}
    </div>
    {demoLink && <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-primary mr-4">View Demo</a>}
    {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-primary">View on GitHub</a>}
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchAllData();
        if (data && data.projects) {
          setProjects(Object.values(data.projects));
        } else {
          console.warn('Projects data is empty or not in the expected format');
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4">
      <Routes>
        <Route path="/" element={
          <>
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))
            ) : (
              <p>No projects available. Create your first project!</p>
            )}
          </>
        } />
        <Route path=":projectId" element={<ProjectView projects={projects} />} />
      </Routes>
    </div>
  );
};

export default Projects;
