/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Hero uses an Unsplash placeholder. Swap for a local /public image and you can remove this.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
