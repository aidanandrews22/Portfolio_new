import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchContent } from '../../services/DataService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Preview from '../markdown/Preview';

const ProjectView = ({ projects }) => {
  const [projectContent, setProjectContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const loadProjectContent = async () => {
      try {
        const content = await fetchContent('project', projectId);
        setProjectContent(content);
      } catch (err) {
        console.error('Error fetching project content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjectContent();
  }, [projectId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const project = projects.find(p => p.id === projectId);

  return (
    <div>
      <Link to="/projects" className="text-primary hover:underline mb-4 inline-block">&larr; Back to all projects</Link>
      {project && (
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-text-secondary">{project.description}</p>
          <div className="flex flex-wrap gap-2 my-2">
            {project.tags && project.tags.map((tag, index) => (
              <span key={index} className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-sm">{tag}</span>
            ))}
          </div>
          {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-primary mr-4">View Demo</a>}
          {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary">View on GitHub</a>}
        </div>
      )}
      <hr className="my-8 border-t border-gray-300" />
      {projectContent ? (
        <div className="mt-10 prose max-w-none">
          <Preview doc={projectContent} />
        </div>
      ) : (
        <p>No content available for this project.</p>
      )}
    </div>
  );
};

export default ProjectView;