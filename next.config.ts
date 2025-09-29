import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "@dyad-sh/nextjs-webpack-component-tagger",
      });
    }
    
    // Optimize bundle size by excluding unused modules
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add any specific module optimizations here
    };
    
    return config;
  },
  
  // Enable compression for better performance
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Enable React production optimizations
  reactStrictMode: true,
  
  // Remove problematic experimental CSS optimization
  // experimental: {
  //   optimizeCss: true, // This requires critters dependency
  // },
};

export default nextConfig;
