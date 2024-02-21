/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/profile_images/**",
      }
    ],
    domains: [
      "ucb80427f5c964c7dea1209e9c0f.previews.dropboxusercontent.com",
      "pub-3933f607a5f3452799e1095c27dd0c9b.r2.dev",
      "e8cf6e5ae8cb4fd0df33a1fef8bbba19.r2.cloudflarestorage.com",
      "pub-663b319392ab4793a6b89c2726603394.r2.dev",
      "placehold.co",
      "kb-files.gumlet.io",
      "kb-files.sgp1.digitaloceanspaces.com",
      "kipley-assets-public.gumlet.io",
      "digitaloceanspaces.com",
      "knowledgefi-kb-files-test.e8cf6e5ae8cb4fd0df33a1fef8bbba19.r2.cloudflarestorage.com",
      "knowledgefi-assets-test.kip.pro"
    ],
  },
};

module.exports = nextConfig;
