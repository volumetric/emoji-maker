/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this section:
  head: {
    htmlAttributes: { lang: 'en' },
    bodyAttributes: {
      'data-new-gr-c-s-check-loaded': null,
      'data-gr-ext-installed': null,
    },
  },
};

export default nextConfig;
