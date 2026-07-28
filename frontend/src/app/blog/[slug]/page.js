import Link from "next/link";
import posts from "../../../data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
        <p>Post not found.</p>
        <Link href="/blog" className="text-amber hover:underline">
          Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="font-mono text-xs text-teal hover:underline uppercase tracking-wide"
      >
        &larr; Back to blog
      </Link>

      <p className="font-mono text-xs uppercase tracking-wide text-muted mt-8 mb-3">
        {post.publishedAt}
      </p>
      <h1 className="font-display text-3xl md:text-5xl mb-8">{post.title}</h1>

      <p className="text-muted text-lg leading-relaxed">{post.content}</p>
    </main>
  );
}
