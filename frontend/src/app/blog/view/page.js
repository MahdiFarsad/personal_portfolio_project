"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost/portfolio/backend/api/post.php"
    : "/api/post.php";

function PostDetail() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

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
          setPost(data);
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
          {status === "notfound" ? "Post not found." : "Could not load this post."}
        </p>
        <Link href="/blog" className="text-amber hover:underline">
          Back to blog
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/blog"
        className="font-mono text-xs text-teal hover:underline uppercase tracking-wide"
      >
        &larr; Back to blog
      </Link>

      <p className="font-mono text-xs uppercase tracking-wide text-muted mt-8 mb-3">
        {post.published_at}
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-8">{post.title}</h1>

      <p className="text-muted text-lg leading-relaxed">{post.content}</p>
    </>
  );
}

export default function BlogViewPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <Suspense fallback={<p className="text-muted font-mono text-sm">Loading...</p>}>
        <PostDetail />
      </Suspense>
    </main>
  );
}
