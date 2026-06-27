import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/lucas-resell",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
