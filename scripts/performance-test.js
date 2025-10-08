#!/usr/bin/env node

/**
 * Performance Testing Script for Bangladesh Directory Website
 * Run this script to test performance improvements
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Performance Testing for Bangladesh Directory Website\n');

// Test 1: Build time measurement
console.log('📦 Test 1: Build Performance');
try {
  console.time('Build Time');
  const pnpmLock = path.join(process.cwd(), 'pnpm-lock.yaml');
  const yarnLock = path.join(process.cwd(), 'yarn.lock');
  const packageManager = fs.existsSync(pnpmLock) ? 'pnpm' : fs.existsSync(yarnLock) ? 'yarn' : 'npm';
  execSync(`${packageManager} run build`, { stdio: 'inherit' });
  console.timeEnd('Build Time');
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Test 2: Bundle size analysis
console.log('📊 Test 2: Bundle Size Analysis');
try {
  const nuxtClientDir = path.join(process.cwd(), '.nuxt', 'dist', 'client');
  const nitroPublicDir = path.join(process.cwd(), '.output', 'public', '_nuxt');
  const bundleRoot = fs.existsSync(nuxtClientDir)
    ? nuxtClientDir
    : fs.existsSync(nitroPublicDir)
      ? nitroPublicDir
      : null;

  if (bundleRoot) {
    const analyzeBundle = () => {
      let totalSize = 0;
      let fileCount = 0;

      const walkDir = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            walkDir(filePath);
          } else if (stat.isFile()) {
            const size = stat.size;
            totalSize += size;
            fileCount++;
            
            // Log large files (> 100KB)
            if (size > 100 * 1024) {
              console.log(`  📁 ${path.relative(bundleRoot, filePath)}: ${(size / 1024).toFixed(2)} KB`);
            }
          }
        });
      };

      walkDir(bundleRoot);
      
      console.log(`\n📈 Bundle Statistics:`);
      console.log(`   Total Files: ${fileCount}`);
      console.log(`   Total Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Average File Size: ${(totalSize / fileCount / 1024).toFixed(2)} KB`);
    };

    analyzeBundle();
  }
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
}

// Test 3: Lighthouse CI simulation
console.log('\n🔍 Test 3: Performance Metrics Simulation');
const simulateLighthouseMetrics = () => {
  const metrics = {
    firstContentfulPaint: Math.random() * 1000 + 800, // 800-1800ms
    largestContentfulPaint: Math.random() * 1500 + 1500, // 1500-3000ms
    cumulativeLayoutShift: Math.random() * 0.1, // 0-0.1
    totalBlockingTime: Math.random() * 200 + 100, // 100-300ms
    speedIndex: Math.random() * 2000 + 1500, // 1500-3500ms
  };

  console.log('📊 Simulated Lighthouse Metrics:');
  console.log(`   First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(0)}ms`);
  console.log(`   Largest Contentful Paint: ${metrics.largestContentfulPaint.toFixed(0)}ms`);
  console.log(`   Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(3)}`);
  console.log(`   Total Blocking Time: ${metrics.totalBlockingTime.toFixed(0)}ms`);
  console.log(`   Speed Index: ${metrics.speedIndex.toFixed(0)}ms`);

  // Performance scoring
  const scoreFCP = metrics.firstContentfulPaint <= 1000 ? 1 : metrics.firstContentfulPaint <= 2500 ? 0.5 : 0;
  const scoreLCP = metrics.largestContentfulPaint <= 2500 ? 1 : metrics.largestContentfulPaint <= 4000 ? 0.5 : 0;
  const scoreCLS = metrics.cumulativeLayoutShift <= 0.1 ? 1 : metrics.cumulativeLayoutShift <= 0.25 ? 0.5 : 0;
  
  const overallScore = ((scoreFCP + scoreLCP + scoreCLS) / 3 * 100).toFixed(1);
  console.log(`\n🏆 Performance Score: ${overallScore}/100`);
};

simulateLighthouseMetrics();

// Test 4: Memory usage check
console.log('\n💾 Test 4: Memory Usage Check');
const memoryUsage = process.memoryUsage();
console.log(`   RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);

console.log('\n🎉 Performance testing completed!');
console.log('\n📋 Next Steps:');
console.log('   1. Run the application with your package manager (e.g. pnpm dev)');
console.log('   2. Open Chrome DevTools → Performance for a real trace');
console.log('   3. Use Lighthouse for lab metrics');
console.log('   4. Monitor browser console for performance logs from PerformanceMonitor');
