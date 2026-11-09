/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep validation builds separate from an already-running development server.
  distDir: process.env.CHORD_FINDER_DIST_DIR || ".next",
};

export default nextConfig;
