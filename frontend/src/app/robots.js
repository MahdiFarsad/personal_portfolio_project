export const dynamic = "force-static";

export default function robots() {
  const baseUrl = "https://mahdifarsad.com"; 

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
