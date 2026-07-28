export default function sitemap() {
  const baseUrl = "https://yourdomain.com"; // <-- change to your real domain

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
