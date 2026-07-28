import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="border-b border-surface px-6 md:px-16 py-5">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm uppercase tracking-wide">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted hover:text-teal transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
