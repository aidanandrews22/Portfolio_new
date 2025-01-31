import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PdfFile {
  name: string;
  label: string;
  lastUpdated: string;
  group: 'transcript' | 'other';
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
}

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
  tags?: string[];
}

const pdfFiles: PdfFile[] = [
  { name: 'Aidan_Andrews_Official_Transcript.pdf', label: 'Official-Transcript', lastUpdated: '2024-12-25', group: 'transcript' },
  { name: 'Aidan_Andrews_Unofficial_Transcript.pdf', label: 'Unofficial-Transcript', lastUpdated: '2025-01-06', group: 'transcript' },
  { name: 'Aidan_Andrews_Resume.pdf', label: 'Resume', lastUpdated: '2025-01-06', group: 'other' },
  { name: 'cover-letter.pdf', label: 'Cover Letter', lastUpdated: '2024-10-08', group: 'other' }
];

// Just store the IDs of current projects
const currentProjectIds = ["illini-plan", "illini-spots"];

const AboutSection = () => (
  <section className="space-y-4">
    <h1 className="text-4xl font-bold">About Me</h1>
    <p className="text-lg leading-relaxed">
      I stream myself working on{' '}
      <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
        youtube
      </a>. 
      As a current student and a researcher focused on machine learning applications in physics and biology, 
      I am deeply committed to using technology to solve complex problems. My academic and recreational projects 
      are where I try to apply my knowledge. I spend all of my time learning, researching, playing chess, and 
      exercising (mainly playing hockey and tennis).
      
      {/* <br /> */}
      {/* <br />Here is a document that contains some of my ideas and daily notes.<br />
      <a href="https://aidanandrews22.github.io/content/notes/Personal/main.pdf" target="_blank" rel="noopener noreferrer" className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
        View Notes →
      </a> */}
    </p>
  </section>
);

const ProjectsSection = ({ projects, loading, error }: { projects: Project[], loading: boolean, error: string | null }) => (
  <section className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Current Projects</h2>
      <Link to="/projects" className="text-sm hover:text-[var(--color-primary)] transition-colors">
        View all projects →
      </Link>
    </div>
    {loading ? (
      <p>Loading projects...</p>
    ) : error ? (
      <p className="text-red-500">Error: {error}</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
    )}
  </section>
);

const DocumentsSection = () => {
  const renderPdfGroup = (group: 'transcript' | 'other') => (
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
                className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline"
              >
                {pdf.label}
              </a>
              <span className="text-xs opacity-75">
                &#160; Last updated: {pdf.lastUpdated}
              </span>
            </div>
          );
        })}
    </div>
  );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Documents</h2>
      <div className="flex justify-between flex-wrap gap-8">
        {renderPdfGroup('transcript')}
        {renderPdfGroup('other')}
      </div>
    </section>
  );
};

const WorkExperienceSection = () => (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">Work Experience</h2>
    
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">AIFARMS National Al Institute & Center for Digital Agriculture</h3>
      <h4 className="text-lg">AI/ML Research Intern</h4>
      <p className="text-sm opacity-75">Nov 2024 - Present</p>
      <p className="mt-2">
        Developing a plethora of tools (eg. pest detection, crop optimization, local climate implications, etc.) for LLM use in production scale chatbots to create a more agentic workflow. Agents are used to increase efficiency of current agricultural practices at scale.
        <br />Working under Professor{' '}
        <a href="https://vikram.cs.illinois.edu/" target="_blank" rel="noopener noreferrer" className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
          Vikram S. Adve
        </a>.
        <a href="https://www.aidanandrews.info/projects/work/" target="_blank" rel="noopener noreferrer" className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
          View Code →
        </a>
      </p>
    </div>

    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Startup (signed an NDA)</h3>
      <h4 className="text-lg">Machine Learning Researcher/Engineer</h4>
      <p className="text-sm opacity-75">May 2024 - Aug 2024</p>
      <p className="mt-2">
        I developed advanced Natural Language Processing (NLP) systems, focusing on optimizing Retrieval-Augmented Generation (RAG) and enhancing intent classification. I designed and implemented a novel "wavular" RAG approach and a hybrid embedding-based classification system, demonstrating proficiency in large-scale information retrieval, machine learning, and deep learning methodologies.
        <br /><strong>Research Paper:</strong>{' '}
        <a href="https://aidanandrews.info/blog/ml130824" target="_blank" rel="noopener noreferrer" className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
          Optimizing Natural Language Processing Systems: Advanced RAG and Intent Classification
        </a>
      </p>
    </div>

    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Dr. Andrews Plastic Surgery</h3>
      <h4 className="text-lg">Machine Learning Researcher/Intern</h4>
      <p className="text-sm opacity-75">2024 - Present</p>
      <p className="mt-2">
        Researching machine learning models to predict the effectiveness of procedures based off of a generalized
        score given to patients. Essentially, the model will take variables like age, gender, resting heart rate,
        and a plethera of other medically derived data like medications. Then uses previous patient data to predict
        how effective a procedure will be given the patients input variable, then quantifying the result as a normalized
        score.
      </p>
    </div>

    <div className="space-y-2">
      <h3 className="text-xl font-semibold">The Grainger College of Engineering</h3>
      <h4 className="text-lg">Project Manager & Course Assistant</h4>
      <p className="text-sm opacity-75">December 2023 - May 2024</p>
      <p className="mt-2">
        Managing projects and assisting courses within the CS department, focusing on enhancing 
        the educational experiences of undergraduate students through innovative approaches and technologies.
      </p>
    </div>

    <div className="space-y-2">
      <h3 className="text-xl font-semibold">NVRALONE</h3>
      <h4 className="text-lg">Founder & CEO</h4>
      <p className="text-sm opacity-75">2023 - Present</p>
      <p className="mt-2">
        Successfully led a clothing brand to $10,000 in profit per month, raised money for suicide prevention, 
        managed teams of over 20 employees, orchestrated pop-up shops, and developed and managed the website 
        including customer acquisition algorithms.
      </p>
    </div>
  </section>
);

const EducationSection = () => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold">Education</h2>
    {/* <div className="p-4 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
      <h3 className="text-xl font-semibold">University of Illinois Urbana-Champaign</h3>
      <p className="text-sm opacity-75">2023 - 2026</p>
      <p className="mt-2">
        Studying B.S. in Physics from the Grainger College of Engineering. 3-year graduation.
      </p>
    </div> */}
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">University of Illinois Urbana-Champaign</h3>
      <p className="text-sm opacity-75">2023 - 2026</p>
      <h4 className="text-lg">Studying B.S. in Physics from the Grainger College of Engineering. 3-year graduation.</h4>
    </div>
  </section>
);

const RecentBlogSection = () => {
  const [recentPost, setRecentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/posts.json');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const posts = await response.json();
        // Sort posts by date and get the most recent one
        const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setRecentPost(sortedPosts[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent blog post:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch recent blog post');
        setLoading(false);
      }
    };

    fetchRecentPost();
  }, []);

  if (loading) return <section className="space-y-4"><h2 className="text-2xl font-bold">Recent Blog Post</h2><p>Loading...</p></section>;
  if (error) return <section className="space-y-4"><h2 className="text-2xl font-bold">Recent Blog Post</h2><p className="text-red-500">{error}</p></section>;
  if (!recentPost) return null;

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Blog Post</h2>
        <Link to="/blog" className="text-sm hover:text-[var(--color-primary)] transition-colors">
          View all posts →
        </Link>
      </div>
      
      <Link
        to={`/blog/${recentPost.id}`}
        className="block group"
      >
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">{recentPost.title}</h3>
            <time className="text-sm" dateTime={recentPost.date}>
              {new Date(recentPost.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <p className="mb-4 text-sm/relaxed">{recentPost.description}</p>
          
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              {recentPost.category}
            </span>
            {recentPost.tags && recentPost.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <span className="inline-block mt-4 text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
            Read more →
          </span>
        </motion.article>
      </Link>
    </section>
  );
};

export default function About() {
  const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/projects.json');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const allProjects = await response.json();
        const filteredProjects = allProjects.filter((project: Project) => 
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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-12 pb-12"
    >
      <AboutSection />
      <DocumentsSection />
      <EducationSection />
      <WorkExperienceSection />
      <ProjectsSection projects={currentProjects} loading={loading} error={error} />
      <RecentBlogSection />
      <p className="text-lg leading-relaxed">
        Here is a document that contains some of my ideas and daily notes.<br />
        <a href="https://aidanandrews22.github.io/content/notes/Personal/main.pdf" target="_blank" rel="noopener noreferrer" className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
          View Notes →
        </a>
      </p>
    </motion.div>
  );
} 

