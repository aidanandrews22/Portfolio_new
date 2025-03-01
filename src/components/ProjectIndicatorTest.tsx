import React, { useState } from 'react';
import ProjectIndicators from './ProjectIndicators';

const ProjectIndicatorTest: React.FC = () => {
  const [projectId, setProjectId] = useState<string>('test-project');
  
  const handleProjectIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value);
  };
  
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project Indicator Test</h2>
      
      <div className="mb-6">
        <label htmlFor="projectId" className="block text-sm font-medium mb-2">
          Project ID
        </label>
        <input
          type="text"
          id="projectId"
          value={projectId}
          onChange={handleProjectIdChange}
          className="w-full px-3 py-2 border rounded-md"
        />
        <p className="text-xs mt-1 text-gray-500">
          Enter a project ID to test the indicators. This will be used to store and retrieve the indicator counts.
        </p>
      </div>
      
      <div className="p-6 border rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-4 text-center">Project Indicators</h3>
        <ProjectIndicators projectId={projectId} />
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>How it works:</strong> Each indicator (Clever, Launch It, Inspired) is stored in AWS Amplify 
          with a unique ID based on the project ID and indicator type. The counts are persisted across sessions.
        </p>
        <p className="mt-2">
          <strong>Testing:</strong> Try changing the project ID and clicking on different indicators. 
          Then refresh the page or come back later to see if the counts persist.
        </p>
      </div>
    </div>
  );
};

export default ProjectIndicatorTest; 