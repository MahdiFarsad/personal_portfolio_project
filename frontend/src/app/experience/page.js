import experience from "../../data/experience";
export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        Work Flow
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-14">Experience</h1>

      <div className="relative pl-8">
        {/* vertical connecting line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-surface" />

        <div className="flex flex-col gap-12">
          {experience.map((job) => (
            <div key={job.id} className="relative">
              {/* node dot */}
              <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-teal border-2 border-ink" />

              <p className="font-mono text-xs uppercase tracking-wide text-amber mb-2">
                {job.startDate} — {job.endDate}
              </p>
              <h2 className="font-display text-xl mb-1">{job.title}</h2>
              <p className="font-mono text-sm text-teal mb-3">{job.company}</p>
              <p className="text-muted text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
