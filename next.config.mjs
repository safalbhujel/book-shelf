/**
 * Next.js Configuration
 * @type {import('next').NextConfig}
 *
 * Configuration options:
 * - typescript.ignoreBuildErrors: Allow builds with TypeScript errors (dev-friendly)
 * - images.unoptimized: Disable Next.js image optimization (for static exports)
 */
const nextConfig = {
  typescript: {
    // Allow builds to complete with TypeScript errors during development
    ignoreBuildErrors: true,
  },
  images: {
    // Use unoptimized images for better compatibility with static hosting
    unoptimized: true,
  },
}

export default nextConfig
