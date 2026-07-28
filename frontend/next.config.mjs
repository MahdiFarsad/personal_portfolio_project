/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // required for static export — Next's image optimization needs a server
  },
};

export default nextConfig;