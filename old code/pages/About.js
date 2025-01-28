import React, { useState, useEffect } from 'react';
import Skills from './Skills';
import { Link } from 'react-router-dom';

const About = () => {
  const pdfFiles = [
    { name: 'Aidan_Andrews_Official_Transcript.pdf', label: 'Official-Transcript', lastUpdated: '2024-12-25', group: 'transcript' },
    { name: 'Aidan_Andrews_Unofficial_Transcript.pdf', label: 'Unofficial-Transcript', lastUpdated: '2025-01-06', group: 'transcript' },
    { name: 'Aidan_Andrews_Resume.pdf', label: 'Resume', lastUpdated: '2025-01-06', group: 'other' },
    { name: 'cover-letter.pdf', label: 'Cover Letter', lastUpdated: '2024-10-08', group: 'other' }
  ];

  const currentProjects = [
    {
      id: "illini-plan",
      title: "IlliniPlan: AI Powered Class Planner",
      description: "Built an app for course mapping, graduation tracking, and rule-enforcing scheduling, integrating institutional data, personalized LLM-driven recommendations, and exportable schedules.",
      tags: ["React", "Machine Learning", "Algorithms & Data Structures"],
      demoLink: "https://main.d3jmvbxto8loyp.amplifyapp.com/"
    },
    {
      id: "illini-spots",
      title: "IlliniSpots: The Instagram of study spots at UIUC",
      description: "Shows all buildings on campus with room availability. Users can favorite buildings and comment.",
      demoLink: "https://example.com/",
      githubLink: "https://github.com/aidanandrews22/IlliniSpots",
      tags: ["Swift, React Native", "Postgres, Firebase", "Search"]
    }
  ];

  const CompactProjectCard = ({ id, title, description, tags, demoLink }) => (
    <div className="bg-white shadow rounded-lg p-4 mx-auto">
      <h3 className="text-lg font-semibold">
        <Link to={`/projects/${id}`} className="text-primary">{title}</Link>
      </h3>
      <p className="text-sm text-text-secondary my-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags && tags.map((tag, index) => (
          <span key={index} className="bg-secondary text-text-secondary px-2 py-1 rounded-full text-sm">{tag}</span>
        ))}
      </div>
      <div className="text-sm">
        {demoLink && (
          <>
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Demo Site</a>
          </>
        )}
      </div>
    </div> 
  );

  const renderPdfGroup = (group) => (
    <div className="flex flex-col">
      <h3 className="font-semibold mb-2">{group === 'transcript' ? 'Transcripts' : 'Professional'}</h3>
      {pdfFiles
        .filter(pdf => pdf.group === group)
        .map(pdf => {
          const staticUrl = `https://aidanandrews22.github.io/content/pdf/${pdf.name}`;
          return (
            <div key={pdf.name} className="mb-2">
              <a
                href={staticUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                {pdf.label}
              </a>
              <span className="text-xs text-gray-500">
                &#160; Last updated: {pdf.lastUpdated}
              </span>
            </div>
          );
        })}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-text-secondary mb-4">
          I stream myself working on <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="text-primary">youtube</a>. 
          As a current student and a researcher focused on machine learning applications in physics and biology, 
          I am deeply committed to using technology to solve complex problems. My academic and recreational projects 
          are where I try to apply my knowledge. I spend all of my time learning, researching, playing chess, and 
          exercising (mainly playing hockey and tennis).
        </p>
        <h2 className="text-2xl font-bold mb-4">Current Projects</h2>
        <div className="space-y-4">
          {currentProjects.map((project, index) => (
            <CompactProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Documents</h2>
        <div className="flex justify-between">
          {renderPdfGroup('transcript')}
          {renderPdfGroup('other')}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">AIFARMS National Al Institute & Center for Digital Agriculture</h3>
          <h4 className="text-lg">AI/ML Research Intern</h4>
          <p className="text-sm text-text-secondary">Nov 2024 - Present</p>
          <p className="mt-2">
            Developing a plethora of tools (eg. pest detection, crop optimization, local climate implications, etc.) for LLM use in production scale chatbots to create a more agentic workflow. Agents are used to increase efficiency of current agricultural practices at scale.
            <br></br>Working under Professor <a href="https://vikram.cs.illinois.edu/" target="_blank" rel="noopener noreferrer" className="text-primary">Vikram S. Adve</a>.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Startup (signed an NDA)</h3>
          <h4 className="text-lg">Machine Learning Researcher/Engineer</h4>
          <p className="text-sm text-text-secondary">May 2024 - Aug 2024</p>
          <p className="mt-2">
            I developed advanced Natural Language Processing (NLP) systems, focusing on optimizing Retrieval-Augmented Generation (RAG) and enhancing intent classification. I designed and implemented a novel "wavular" RAG approach and a hybrid embedding-based classification system, demonstrating proficiency in large-scale information retrieval, machine learning, and deep learning methodologies. The work involved extensive use of Python, PyTorch, and TensorFlow, along with CUDA programming for GPU acceleration. I applied advanced NLP techniques including vector space models, similarity metrics (cosine similarity, Euclidean distance), and various text representation methods. The project required sophisticated data preprocessing and management for large-scale NLP datasets, showcasing my ability to develop innovative solutions for complex NLP challenges in resource-constrained environments.
            <br></br><strong>Research Paper:</strong> <a href="https://aidanandrews.info/blog/ml130824" target="_blank">Optimizing Natural Language Processing Systems: Advanced RAG and Intent Classification</a>
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Dr. Andrews Plastic Surgery</h3>
          <h4 className="text-lg">Machine Learning Researcher/Intern</h4>
          <p className="text-sm text-text-secondary">2024 - Present</p>
          <p className="mt-2">
            Researching machine learning models to predict the effectiveness of procedures based off of a generalized
            score given to patients. Essentially, the model will take variables like age, gender, resting heart rate,
            and a plethera of other medically derived data like medications. Then uses previous patient data to predict
            how effective a procedure will be given the patients input variable, then quantifying the result as a normalized
            score.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">The Grainger College of Engineering</h3>
          <h4 className="text-lg">Project Manager & Course Assistant</h4>
          <p className="text-sm text-text-secondary">December 2023 - May 2024</p>
          <p className="mt-2">
            Managing projects and assisting courses within the CS department, focusing on enhancing 
            the educational experiences of undergraduate students through innovative approaches and technologies.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">NVRALONE</h3>
          <h4 className="text-lg">Founder & CEO</h4>
          <p className="text-sm text-text-secondary">2023 - Present</p>
          <p className="mt-2">
            Successfully led a clothing brand to $10,000 in profit per month, raised money for suicide prevention, 
            managed teams of over 20 employees, orchestrated pop-up shops, and developed and managed the website 
            including customer acquisition algorithms.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div>
          <h3 className="text-xl font-semibold">University of Illinois Urbana-Champaign</h3>
          <p className="text-sm text-text-secondary">2023 - 2026</p>
          <p className="mt-2">
            Studying B.S. in Physics from the Grainger College of Engineering. 3-year graduation.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <Skills />
      </section>
    </div>
  );
};

export default About;
