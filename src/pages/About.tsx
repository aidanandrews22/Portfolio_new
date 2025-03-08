import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogPostCard, { BlogPost as BlogPostType } from '../components/BlogPostCard';
import ProjectCard, { Project as ProjectType } from '../components/ProjectCard';

interface PdfFile {
  name: string;
  label: string;
  lastUpdated: string;
  group: 'transcript' | 'other';
}

const pdfFiles: PdfFile[] = [
  { name: 'Aidan_Andrews_Official_Transcript.pdf', label: 'Official-Transcript', lastUpdated: '2024-12-25', group: 'transcript' },
  { name: 'Aidan_Andrews_Unofficial_Transcript.pdf', label: 'Unofficial-Transcript', lastUpdated: '2025-01-06', group: 'transcript' },
  { name: 'Aidan_Andrews_Resume.pdf', label: 'Resume', lastUpdated: '2025-01-06', group: 'other' },
  { name: 'cover-letter.pdf', label: 'Cover Letter', lastUpdated: '2024-10-08', group: 'other' }
];

// Just store the IDs of current projects
const currentProjectIds = ["voxed", "illini-plan", "illini-spots", "research-agent"];

const AboutSection = () => (
  <section className="relative">
    {/* Hero section with background */}
    <div className="relative mb-12 rounded-2xl overflow-hidden">
      <div className="">
        <img 
          src="/assets/About/call.jpg" 
          alt="Aidan Andrews" 
          className="w-full h-full object-cover dark:brightness-75"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      
      {/* Overlay with intro text - adjusted to start from top-left */}
      <div className="absolute inset-0 flex flex-col justify-start items-start py-4 px-4 md:px-12 bg-gradient-to-r from-[color-mix(in_oklch,black_25%,transparent)] to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white custom-outline">Aidan Andrews</h1>
        <div className="flex flex-row space-x-2">
          <p className="text-xl md:text-2xl opacity-90 font-light text-orange-400 custom-outline">Student.</p>
          <p className="text-xl md:text-2xl opacity-90 font-light text-blue-400 custom-outline">Researcher.</p>
          <p className="text-xl md:text-2xl opacity-90 font-light text-white custom-outline">Builder.</p>
        </div>
      </div>
    </div>

    {/* Documents quick links */}
    <div className="mt-8 mb-8 pb-6 border-b border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
      <h3 className="text-lg font-semibold mb-4">Important Documents</h3>
      <div className="flex flex-wrap gap-3">
        {pdfFiles.map(pdf => (
          <a
            key={pdf.name}
            href={`https://aidanandrews22.github.io/content/pdf/${pdf.name}`}
                target="_blank"
                rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] transition-colors"
              >
                {pdf.label}
              </a>
        ))}
      </div>
    </div>
    
    {/* Personal introduction */}
    <div className="space-y-6">
      <div className="prose prose-adaptive prose-lg max-w-none">
        <p className="text-xl leading-relaxed">
          I'm passionate about solving difficult, thought-provoking problems at the intersection of machine learning, 
          computer vision, and their applications to fields like physics, bio, and every day life.
        </p>
        
    <p className="text-lg leading-relaxed">
          At my core, I believe in trying my absolute hardest in every facet of life. This philosophy extends to my 
          academic pursuits, entrepreneurial ventures, athletic endeavors, and personal projects. I'm constantly 
          seeking to learn and grow — not for personal accolades, but because I genuinely believe that becoming 
          the best version of myself allows me to better serve those around me.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
          <h3 className="text-xl font-semibold mb-3">Tech Expertise</h3>
          <p className="text-sm/relaxed">
            Full-stack development, machine learning algorithms, computer vision systems, and LLM applications for practical solutions.
          </p>
        </div>
        
        <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
          <h3 className="text-xl font-semibold mb-3">Athletics</h3>
          <p className="text-sm/relaxed">
            I play D1 hockey for the University of Illinois, tennis semi-competitively, and run occasionally (training for a marathon soon).
          </p>
        </div>
        
        <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
          <h3 className="text-xl font-semibold mb-3">In my free time</h3>
          <p className="text-sm/relaxed">
            I am an avid chess player. Currently working toward becoming a titled master (most realistically, a CM). Also, soon to be hackathon winner.
          </p>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_25%,transparent)] transition-colors text-[var(--color-primary)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          Watch me work on Youtube
        </a>
      </div>
    </div>
  </section>
);

const ProjectsSection = ({ projects, loading, error }: { projects: ProjectType[], loading: boolean, error: string | null }) => (
  <section className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold">Current Projects</h2>
      <Link to="/projects" className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors">
        View all →
      </Link>
    </div>
    
    <div className="space-y-6">
      <div className="prose prose-adaptive prose-lg max-w-none">
        <p className="leading-relaxed">
          Building meaningful projects is how I translate my ideas into reality. Each project represents a problem 
          I found worth solving or a question I wanted to explore. While I have many interests, these featured projects 
          showcase my current focus on creating practical tools that help people learn, work, and research more effectively.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <p>Error: {error}</p>
          <p className="mt-2 text-sm">Please try refreshing the page or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              compact={true}
            />
          ))}
        </div>
      )}
      
      <div className="text-center pt-4">
        <p className="text-sm opacity-80 italic">
          These projects are just a small sample of my work. I'm constantly building and experimenting with new ideas.
          Check out my GitHub for more or reach out if you'd like to collaborate!
        </p>
      </div>
    </div>
  </section>
);

const WhatDrivesMe = () => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold">What Drives Me</h2>
    
    <div className="relative">
      {/* Quote block */}
      <div className="pl-6 border-l-4 border-[var(--color-primary)] py-1">
        <p className="text-xl italic font-light">
          "I approach every challenge with a dedication to positive impact, safety, and a deep respect for the nuance of research."
        </p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - text */}
        <div className="space-y-4">
          <p className="leading-relaxed">
            This mindset has guided me through developing various apps that help people solve real world issues, 
            building ML systems that support tens of thousands of users, and creating a clothing brand focused on mental health awareness.
          </p>
          
          <p className="leading-relaxed">
            I'm constantly working toward my long-term goals of advancing my education, expanding my research capabilities, 
            and creating technology that makes a meaningful difference. I believe in the transformative potential of AI when 
            developed responsibly, and I'm committed to being part of that positive transformation.
          </p>
        </div>
        
        {/* Right column - image */}
        <div className="relative rounded-xl overflow-hidden">
          {/* Placeholder for a personal image - perhaps working on a project */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] to-transparent z-10"></div>
          <img 
            src="/assets/header.jpeg" 
            alt="Aidan working on a project" 
            className="w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).parentElement!.classList.add('bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]');
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  </section>
);

const WorkExperienceSection = () => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold">Work Experience</h2>
    
    <div className="grid grid-cols-1 gap-8">
      {/* AAXIOM */}
      <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="md:w-1/4">
            <div className="inline-flex items-center justify-center w-16 h-16">
              <img src="/assets/About/AAXIOM-02.png" alt="AAXIOM Logo" className="w-full h-full object-contain" />
            </div>
            <p className="text-sm mt-2 opacity-75">Nov 2024 - Present</p>
          </div>
          
          <div className="md:w-3/4">
            <h3 className="text-xl font-semibold">AAXIOM</h3>
            <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">Founder & Sole Developer</p>
            
            <p className="mt-3 text-sm/relaxed">
              AAXIOM is a parent company for a multitude of projects, including a clothing brand, 3 web apps, an ios app, and much much more...
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">              
              <a href="https://www.aaxiom.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors">
                <span>View Site →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* AIFARMS */}
      <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="md:w-1/4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <p className="text-sm mt-2 opacity-75">Nov 2024 - Present</p>
          </div>
          
          <div className="md:w-3/4">
      <h3 className="text-xl font-semibold">AIFARMS National Al Institute & Center for Digital Agriculture</h3>
            <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">AI/ML Research Intern</p>
            
            <p className="mt-3 text-sm/relaxed">
              Developing a plethora of tools (eg. pest detection, crop optimization, local climate implications) for LLM use in production scale chatbots to create a more agentic workflow. Agents are used to increase efficiency of current agricultural practices at scale.
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="https://vikram.cs.illinois.edu/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors">
                <span>Prof. Vikram S. Adve</span>
              </a>
              
              <a href="https://www.aidanandrews.info/projects/work/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors">
                <span>View Code →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Startup */}
      <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="md:w-1/4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <p className="text-sm mt-2 opacity-75">May 2024 - Aug 2024</p>
    </div>

          <div className="md:w-3/4">
            <h3 className="text-xl font-semibold">Startup <span className="text-sm font-normal opacity-75">(signed an NDA)</span></h3>
            <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">Machine Learning Researcher/Engineer</p>
            
            <p className="mt-3 text-sm/relaxed">
              I developed advanced Natural Language Processing (NLP) systems, focusing on optimizing Retrieval-Augmented Generation (RAG) and enhancing intent classification. I designed and implemented a novel "wavular" RAG approach and a hybrid embedding-based classification system.
            </p>
            
            <div className="mt-4">
              <a href="https://aidanandrews.info/blog/ml130824" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors">
                <span>Research Paper →</span>
              </a>
            </div>
          </div>
        </div>
    </div>

      {/* Other experiences as expandable section */}
      <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
        <details className="group">
          <summary className="cursor-pointer list-none flex justify-between items-center">
            <h3 className="text-xl font-semibold">Other Experiences</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div className="mt-4 space-y-6 pl-4 border-l-2 border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
            {/* Dr. Andrews */}
    <div className="space-y-2">
              <h4 className="text-lg font-semibold">Dr. Andrews Plastic Surgery</h4>
              <p className="text-sm font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">Machine Learning Researcher/Intern <span className="opacity-75">• 2024 - Present</span></p>
              <p className="text-sm/relaxed">
        Researching machine learning models to predict the effectiveness of procedures based off of a generalized
                score given to patients. The model takes variables like age, gender, resting heart rate, and a plethera of other medically derived data,
                then uses previous patient data to predict effectiveness, quantifying results as a normalized score.
      </p>
    </div>

            {/* Grainger */}
    <div className="space-y-2">
              <h4 className="text-lg font-semibold">The Grainger College of Engineering</h4>
              <p className="text-sm font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">Project Manager & Course Assistant <span className="opacity-75">• December 2023 - May 2024</span></p>
              <p className="text-sm/relaxed">
        Managing projects and assisting courses within the CS department, focusing on enhancing 
        the educational experiences of undergraduate students through innovative approaches and technologies.
      </p>
    </div>

            {/* NVRALONE */}
    <div className="space-y-2">
              <h4 className="text-lg font-semibold">NVRALONE</h4>
              <p className="text-sm font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">Founder & CEO <span className="opacity-75">• 2023 - Present</span></p>
              <p className="text-sm/relaxed">
        Successfully led a clothing brand to $10,000 in profit per month, raised money for suicide prevention, 
                managed teams of over 20 employees, orchestrated pop-up shops, and developed the website 
        including customer acquisition algorithms.
      </p>
            </div>
          </div>
        </details>
      </div>
    </div>
  </section>
);

const EducationSection = () => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold">Education</h2>
    
    <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Logo/Icon */}
        <div className="md:w-1/4 flex flex-col items-center">
          <div className="w-32 h-32 rounded-lg overflow-hidden relative">
            {/* Logo placeholder */}
            <img 
              src="/assets/About/uiuc-logo.png" 
              alt="UIUC Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                // Add a fallback text element
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  const text = document.createElement('div');
                  text.className = 'absolute inset-0 flex items-center justify-center text-2xl font-bold text-[var(--color-primary)]';
                  text.textContent = 'UIUC';
                  parent.appendChild(text);
                }
              }}
            />
          </div>
          <div className="mt-4 text-center">
            <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
              3.9 GPA
            </span>
          </div>
        </div>
        
        {/* Right side - Details */}
        <div className="md:w-3/4">
          <h3 className="text-2xl font-bold text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
            University of Illinois Urbana-Champaign
          </h3>
          <p className="text-lg font-semibold mt-1">B.S. in Physics, The Grainger College of Engineering</p>          
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="font-medium">Accelerated Program</p>
                <p className="text-sm opacity-75">On track to graduate in 3 years instead of the traditional 4-year program.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <div>
                <p className="font-medium">Research Focus</p>
                <p className="text-sm opacity-75">Emphasis on machine learning applications in physics and computational methods.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TechnicalExpertiseSection = () => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold">Technical Expertise</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left column - Primary skills */}
      <div className="col-span-2 p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all">
        <h3 className="text-xl font-semibold mb-4">Core Skills</h3>
        
        <div className="space-y-6">
          {/* Machine Learning */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Machine Learning & AI</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">Advanced</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['CNNs', 'Transformers', 'RAG', 'LLMs', 'Computer Vision', 'NLP', 'PyTorch', 'TensorFlow'].map(skill => (
                <span key={skill} className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Software Development */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Software Development</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">Advanced</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'JavaScript/TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'Docker', 'System Design'].map(skill => (
                <span key={skill} className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Physics & Math */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Physics & Mathematics</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">Advanced</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Quantum Mechanics', 'Statistical Mechanics', 'Linear Algebra', 'Calculus', 'Differential Equations', 'Data Analysis'].map(skill => (
                <span key={skill} className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right column - Progress bars for languages */}
      <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]">
        <h3 className="text-xl font-semibold mb-4">Languages</h3>
        
        <div className="space-y-6">
          {/* Python */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Python</span>
              <span className="text-xs">95%</span>
            </div>
            <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: '95%' }}></div>
            </div>
          </div>
          
          {/* JavaScript/TypeScript */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">JavaScript/TypeScript</span>
              <span className="text-xs">90%</span>
            </div>
            <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: '90%' }}></div>
            </div>
          </div>
          
          {/* C++ */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">C/C++</span>
              <span className="text-xs">85%</span>
            </div>
            <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          {/* Java */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Java</span>
              <span className="text-xs">80%</span>
            </div>
            <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          {/* SQL */}
    <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">SQL</span>
              <span className="text-xs">85%</span>
            </div>
            <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RecentBlogSection = () => {
  const [recentPost, setRecentPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts.json');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const posts = await response.json();
        
        // Sort posts by date and get the most recent one
        try {
          const sortedPosts = posts.sort((a: BlogPostType, b: BlogPostType) => {
            try {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            } catch (err) {
              console.error('Error sorting post dates:', err);
              return 0; // Keep original order if date comparison fails
            }
          });
          
          if (sortedPosts && sortedPosts.length > 0) {
            setRecentPost(sortedPosts[0]);
          } else {
            throw new Error('No blog posts found');
          }
        } catch (err) {
          console.error('Error processing posts data:', err);
          throw err;
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent blog post:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch recent blog post');
        setLoading(false);
      }
    };

    fetchRecentPost();
  }, []);

  if (loading) return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Recent Blog Post</h2>
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    </section>
  );
  
  if (error) return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Recent Blog Post</h2>
      <div className="p-6 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
        <p>{error}</p>
        <p className="mt-2 text-sm">Please try refreshing the page or check back later.</p>
      </div>
    </section>
  );
  
  if (!recentPost) return null;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Recent Blog Post</h2>
        <Link to="/blog" className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors">
          View all →
        </Link>
      </div>
      
      <div className="prose prose-adaptive prose-lg max-w-none mb-6">
        <p className="leading-relaxed">
          Writing and research allow me to explore ideas in depth and share my discoveries with others. My blog is where I document 
          my learning journey, share technical insights, and occasionally dive into philosophical questions about technology and its 
          impact. Below is my most recent post – a window into what's currently capturing my attention.
        </p>
      </div>
      
      <BlogPostCard post={recentPost} compact={true} />
      
      <div className="text-center pt-2">
        <p className="text-sm opacity-80 italic">
          I try to write regularly about my research findings, interesting technical challenges, and thoughts on technology's future.
          My goal is to share knowledge that's both insightful and accessible.
        </p>
      </div>
    </section>
  );
};

const InstagramFeed = () => {
  useEffect(() => {
    // Create and load the Behold script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://w.behold.so/widget.js';
    document.head.appendChild(script);

    // Clean up function to remove the script when component unmounts
    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Instagram</h2>
        <a 
          href="https://www.instagram.com/aidanandrewss/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors inline-flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @aidanandrewss
        </a>
      </div>
      
      <div className="prose prose-adaptive prose-lg max-w-none mb-6">
        <p className="leading-relaxed">
          Beyond my academic and professional work, I share glimpses of my day-to-day life on Instagram. It's like a more exclusive internet portfolio.
        </p>
      </div>
      
      <div className="rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Profile Info Section */}
          <div className="p-6 md:w-1/3 flex flex-col justify-center items-center md:border-r border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]">
              <img 
                src="/assets/About/ig_pfp.jpg" 
                alt="Aidan Andrews" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=AA';
                }}
              />
            </div>
            
              {/* Decorative circles */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]"></div>
              <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"></div>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">Aidan Andrews</h3>
            <a 
              href="https://www.instagram.com/aidanandrewss/" 
              target="_blank" 
              rel="noopener noreferrer"
                className="text-sm text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline"
            >
              @aidanandrewss
            </a>
            </div>
            
            <div className="flex gap-6 mt-6 text-sm">
              <div className="text-center">
                <div className="font-semibold">50+</div>
                <div className="opacity-75 text-xs">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">2,000+</div>
                <div className="opacity-75 text-xs">Followers</div>
              </div>
            </div>
            
            
            <a 
              href="https://www.instagram.com/aidanandrewss/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 px-4 py-2 text-sm rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_25%,transparent)] transition-colors inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow
            </a>
          </div>
          
          {/* Behold Widget Section */}
          <div className="md:w-2/3 p-4 relative">
            <div data-behold-id="4rd4S35EClbGiv4HjWHq" className="w-full h-full min-h-[300px]"></div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm opacity-70 mt-4">
        <p className="mt-2">
          Feel free to reach out there if you'd like to connect or collaborate!
        </p>
      </div>
    </section>
  );
};

const WhoDrivesMe = () => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold">Who Drives Me</h2>
    
    <div className="relative">
      {/* Quote block */}
      <div className="pl-6 border-l-4 border-[var(--color-primary)] py-1">
        <p className="text-xl italic font-light">
          "Family is not an important thing. It's everything."
        </p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - text */}
        <div className="space-y-4">
          <p className="leading-relaxed">
          My family has always been my foundation - their belief in me and unwavering support drives me to become the best version of myself. 
          </p>
          
          <p className="leading-relaxed">
          Beyond that, I'm motivated by a simple yet powerful desire: to improve the lives of those around me. Every app I build, 
          research paper I contribute to, or problem I solve is fueled by this core mission; I genuinely believe that using my skills to 
          create meaningful solutions isn't just fulfilling — it's my responsibility.
          </p>
        </div>
        
        {/* Right column - image */}
        <div className="relative rounded-xl overflow-hidden">
          {/* Placeholder for a personal image - perhaps working on a project */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] to-transparent z-10"></div>
          <img 
            src="/assets/About/drive.jpg" 
            alt="Aidan working on a project" 
            className="w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).parentElement!.classList.add('bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]');
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default function About() {
  const [currentProjects, setCurrentProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Add a class to the document to ensure dark mode is respected
    document.documentElement.classList.add('color-scheme-adaptive');

    const fetchProjects = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/projects.json');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const allProjects = await response.json();
        const filteredProjects = allProjects.filter((project: ProjectType) => 
          currentProjectIds.includes(project.id)
        );
        setCurrentProjects(filteredProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
    
    // Cleanup function
    return () => {
      document.documentElement.classList.remove('color-scheme-adaptive');
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-16 pb-12"
    >
      <AboutSection />
      <WhatDrivesMe />
      <WorkExperienceSection />
      <EducationSection />
      <ProjectsSection projects={currentProjects} loading={loading} error={error} />
      <RecentBlogSection />
      <InstagramFeed />
      <WhoDrivesMe />
      <TechnicalExpertiseSection />
    </motion.div>
  );
} 

