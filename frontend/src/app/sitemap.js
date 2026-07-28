export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://mahdifarsad.com";

  const routes = [
    "",
    "/projects",
    "/upcoming",
    "/experience",
    "/education",
    "/blog",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
