import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Hi, I'm Aidan Andrews</h1>
        <p className="text-lg leading-relaxed">
          I'm a software engineer passionate about building performant and beautiful web applications.
          Currently studying Computer Science at the University of Illinois at Urbana-Champaign.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What I Do</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
            <h3 className="font-medium mb-2">Frontend Development</h3>
            <p>Building responsive and accessible web applications with modern technologies.</p>
          </div>
          <div className="p-4 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
            <h3 className="font-medium mb-2">Backend Development</h3>
            <p>Designing and implementing scalable server-side solutions.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Education</h2>
        <div className="p-4 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
          <h3 className="font-medium">University of Illinois at Urbana-Champaign</h3>
          <p className="text-sm">Bachelor of Science in Computer Science</p>
          <p className="text-sm">Expected Graduation: May 2025</p>
        </div>
      </section>
    </motion.div>
  );
} 