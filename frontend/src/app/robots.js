export default function robots() {
  const baseUrl = "https://yourdomain.com"; // <-- change to your real domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
