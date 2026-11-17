import type { NextConfig } from "next";

// Sur GitHub Pages, le site est servi soit à la racine (domaine perso, ex. mecdu.dev),
// soit sous /<nom-du-repo>. Le workflow injecte ce chemin via NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
