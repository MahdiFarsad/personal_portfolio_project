import Link from "next/link";
import projects from "../../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
        <p>Project not found.</p>
        <Link href="/projects" className="text-amber hover:underline">
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <Link
        href="/projects"
        className="font-mono text-xs text-teal hover:underline uppercase tracking-wide"
      >
        &larr; Back to projects
      </Link>

      <p className="font-mono text-sm text-teal tracking-widest uppercase mt-8 mb-4">
        {project.category}
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-8">{project.title}</h1>

      <p className="text-muted text-lg leading-relaxed mb-8">
        {project.fullDesc}
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs text-muted border border-surface px-2 py-1 rounded-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 font-mono text-sm">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:underline"
          >
            View on GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </main>
  );
}
