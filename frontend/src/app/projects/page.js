import Link from "next/link";
import projects from "../../data/projects";

export default function ProjectsPage() {
  const published = projects.filter((p) => p.status === "published");

  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-5xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        Field Log
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-10">Projects</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {published.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block border border-surface bg-surface/40 rounded-sm p-6 hover:border-teal/60 transition-colors"
          >
            <p className="font-mono text-xs uppercase tracking-wide text-teal mb-3">
              {project.category}
            </p>
            <h2 className="font-display text-xl mb-3">{project.title}</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              {project.shortDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-muted border border-surface px-2 py-1 rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
