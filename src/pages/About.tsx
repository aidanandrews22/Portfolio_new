import { motion } from 'framer-motion';
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

const pdfFiles: PdfFile[] = [
  { name: 'Aidan_Andrews_Official_Transcript.pdf', label: 'Official-Transcript', lastUpdated: '2024-12-25', group: 'transcript' },
  { name: 'Aidan_Andrews_Unofficial_Transcript.pdf', label: 'Unofficial-Transcript', lastUpdated: '2025-01-06', group: 'transcript' },
  { name: 'Aidan_Andrews_Resume.pdf', label: 'Resume', lastUpdated: '2025-01-06', group: 'other' },
  { name: 'cover-letter.pdf', label: 'Cover Letter', lastUpdated: '2024-10-08', group: 'other' }
];

const currentProjects: Project[] = [
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

const CompactProjectCard = ({ id, title, description, tags, demoLink }: Project) => (
  <div className="p-4 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] transition-all hover:border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
    <h3 className="text-lg font-semibold">
      <Link to={`/projects/${id}`} className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">{title}</Link>
    </h3>
    <p className="text-sm my-2">{description}</p>
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map((tag, index) => (
        <span key={index} className="px-2 py-1 rounded-full text-sm bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">{tag}</span>
      ))}
    </div>
    {demoLink && (
      <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
        View Demo Site
      </a>
    )}
  </div>
);

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

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-12 pb-12"
    >
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Hi, I'm Aidan Andrews</h1>
        <p className="text-lg leading-relaxed">
          I stream myself working on{' '}
          <a href="https://www.youtube.com/@aidanandrews/streams" target="_blank" rel="noopener noreferrer" className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
            youtube
          </a>. 
          As a current student and a researcher focused on machine learning applications in physics and biology, 
          I am deeply committed to using technology to solve complex problems. My academic and recreational projects 
          are where I try to apply my knowledge. I spend all of my time learning, researching, playing chess, and 
          exercising (mainly playing hockey and tennis).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Current Projects</h2>
        <div className="grid gap-4">
          {currentProjects.map((project) => (
            <CompactProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Documents</h2>
        <div className="flex justify-between flex-wrap gap-8">
          {renderPdfGroup('transcript')}
          {renderPdfGroup('other')}
        </div>
      </section>

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

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <div className="p-4 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
          <h3 className="text-xl font-semibold">University of Illinois Urbana-Champaign</h3>
          <p className="text-sm opacity-75">2023 - 2026</p>
          <p className="mt-2">
            Studying B.S. in Physics from the Grainger College of Engineering. 3-year graduation.
          </p>
        </div>
      </section>
    </motion.div>
  );
} 