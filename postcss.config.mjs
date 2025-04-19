// postcss.config.mjs (or .js)

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Include Tailwind CSS PostCSS plugin
    "@tailwindcss/postcss": {},
    // You might potentially add other PostCSS plugins like autoprefixer here
    // but Tailwind v4 often handles prefixing automatically. Check TW docs if needed.
  },
};

export default config;
