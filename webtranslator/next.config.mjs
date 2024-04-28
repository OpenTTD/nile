/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",

  experimental: {
    webpackBuildWorker: true,
  },

  webpack: (config) => {
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
    config.experiments.asyncWebAssembly = true;
    return config;
  },
};

export default nextConfig;
