/**
 * PostCSS Configuration
 * @type {import('postcss-load-config').Config}
 *
 * Configures PostCSS plugins for CSS processing:
 * - @tailwindcss/postcss: Tailwind CSS processing for utility classes and component generation
 */
const config = {
  plugins: {
    // Tailwind CSS plugin - processes @tailwind directives and applies utilities
    '@tailwindcss/postcss': {},
  },
}

export default config
