"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/portfolio/backend/api/projects.php?status=published"
    : "/api/projects.php?status=published";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | loaded | error

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-5xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        Field Log
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-10">Projects</h1>

      {status === "loading" && (
        <p className="text-muted font-mono text-sm">Loading projects...</p>
      )}
      {status === "error" && (
        <p className="text-muted">
          Could not load projects right now. Please check back shortly.
        </p>
      )}

      {status === "loaded" && (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/view?slug=${project.slug}`}
              className="block border border-surface bg-surface/40 rounded-sm p-6 hover:border-teal/60 transition-colors"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-teal mb-3">
                {project.category}
              </p>
              <h2 className="font-display text-xl mb-3">{project.title}</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {project.short_desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
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
      )}
    </main>
  );
}
