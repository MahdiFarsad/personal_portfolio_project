import Link from "next/link";
import posts from "../../data/posts";

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <p className="font-mono text-sm text-teal tracking-widest uppercase mb-4">
        Notes
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-14">Blog</h1>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border-b border-surface pb-8 hover:opacity-80 transition-opacity"
          >
            <p className="font-mono text-xs uppercase tracking-wide text-muted mb-2">
              {post.publishedAt}
            </p>
            <h2 className="font-display text-2xl mb-2">{post.title}</h2>
            <p className="text-muted text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
