"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/portfolio/backend/api/project.php"
    : "/api/project.php";

function ProjectDetail() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | loaded | error | notfound

  useEffect(() => {
    if (!slug) {
      setStatus("notfound");
      return;
    }
    fetch(`${API_URL}?slug=${encodeURIComponent(slug)}`)
      .then((res) => {
        if (res.status === 404) {
          setStatus("notfound");
          return null;
        }
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProject(data);
          setStatus("loaded");
        }
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (status === "loading") {
    return <p className="text-muted font-mono text-sm">Loading...</p>;
  }

  if (status === "notfound" || status === "error") {
    return (
      <>
        <p className="mb-4">
          {status === "notfound" ? "Project not found." : "Could not load this project."}
        </p>
        <Link href="/projects" className="text-amber hover:underline">
          Back to projects
        </Link>
      </>
    );
  }

  return (
    <>
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

      <p className="text-muted text-lg leading-relaxed mb-8">{project.full_desc}</p>

      <div className="flex flex-wrap gap-2 mb-10">
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs text-muted border border-surface px-2 py-1 rounded-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 font-mono text-sm">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:underline"
          >
            View on GitHub
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </>
  );
}

export default function ProjectViewPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <Suspense fallback={<p className="text-muted font-mono text-sm">Loading...</p>}>
        <ProjectDetail />
      </Suspense>
    </main>
  );
}
