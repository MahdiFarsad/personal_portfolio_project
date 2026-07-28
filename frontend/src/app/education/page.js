import { education, research } from "../../data/education";
export const metadata = { title: "Education & Research" };

export default function EducationPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        Academic Record
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-14">
        Education &amp; Research
      </h1>

      {/* Education */}
      <section className="mb-16">
        <h2 className="font-mono text-xs uppercase tracking-wide text-amber mb-6">
          Education
        </h2>
        <div className="flex flex-col gap-8">
          {education.map((item) => (
            <div key={item.id} className="border-l-2 border-teal/40 pl-5">
              <p className="font-mono text-xs uppercase tracking-wide text-muted mb-1">
                {item.startDate} — {item.endDate}
              </p>
              <h3 className="font-display text-xl mb-1">{item.degree}</h3>
              <p className="font-mono text-sm text-teal mb-3">
                {item.institution}
              </p>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Research & Academic Projects */}
      <section>
        <h2 className="font-mono text-xs uppercase tracking-wide text-amber mb-6">
          Research &amp; Academic Projects
        </h2>
        <div className="flex flex-col gap-8">
          {research.map((item) => (
            <div
              key={item.id}
              className="border border-surface bg-surface/40 rounded-sm p-6"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-muted mb-2">
                {item.date}
              </p>
              <h3 className="font-display text-lg mb-3">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-3">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-amber hover:underline"
                >
                  View
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
