export default function Home() {
  const domains = [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Genomics & Biomedical ML",
    "Data Visualization",
    "Full-Stack Development",
  ];

  return (
    <main className="min-h-screen px-6 md:px-16 py-20 max-w-5xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-6">
        Portfolio — Research &amp; Engineering Log
      </p>

      <h1 className="font-display text-4xl md:text-6xl leading-tight mb-8 max-w-3xl">
        Mahdi Farsad Khalili
      </h1>
      <p className="font-body text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
        I build machine learning systems and full-stack applications - from
        biomedical data pipelines and genetic classifiers to production-ready
        web platforms. This is a running log of that work.
      </p>

      <div className="flex flex-wrap gap-3 mb-14">
        {domains.map((d) => (
          <span
            key={d}
            className="font-mono text-xs uppercase tracking-wide border border-teal/40 text-teal px-3 py-1.5 rounded-sm"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 font-mono text-sm">
        <a href="mailto:mahdifarsadarbeit@gmail.com" className="text-amber hover:underline">
          Email
        </a>
        <a
          href="https://github.com/MahdiFarsad"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mahdi-farsad-k/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber hover:underline"
        >
          LinkedIn
        </a>
        <a href="/cv.pdf" className="text-amber hover:underline">
          Download CV
        </a>
      </div>
    </main>
  );
}
