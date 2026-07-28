import projects from "../../data/projects";
export const metadata = { title: "Upcoming Projects" };

export default function UpcomingPage() {
  const upcoming = projects.filter((p) => p.status === "upcoming");

  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-5xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        In Progress
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-10">
        Upcoming Projects
      </h1>

      {upcoming.length === 0 ? (
        <p className="text-muted">Nothing in the pipeline right now — check back soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {upcoming.map((project) => (
            <div
              key={project.slug}
              className="border border-surface bg-surface/40 rounded-sm p-6"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-amber mb-3">
                {project.category} — Planned
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
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
