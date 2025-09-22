/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org", "placehold.co"],
  },
};

export default nextConfig;
