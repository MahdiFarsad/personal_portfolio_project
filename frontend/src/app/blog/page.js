"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/portfolio/backend/api/posts.php"
    : "/api/posts.php";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        Notes
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-14">Blog</h1>

      {status === "loading" && (
        <p className="text-muted font-mono text-sm">Loading posts...</p>
      )}
      {status === "error" && (
        <p className="text-muted">Could not load posts right now.</p>
      )}

      {status === "loaded" && (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/view?slug=${post.slug}`}
              className="block border-b border-surface pb-8 hover:opacity-80 transition-opacity"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-muted mb-2">
                {post.published_at}
              </p>
              <h2 className="font-display text-2xl mb-2">{post.title}</h2>
              <p className="text-muted text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
