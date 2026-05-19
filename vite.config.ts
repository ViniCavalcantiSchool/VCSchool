import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

function critical(options) {
  return {
    name: 'critical',
    closeBundle() {
      // Inlining the whole CSS directly avoids Puppeteer crash and is super fast!
      const htmlPath = path.resolve(__dirname, 'dist', 'index.html');
      let html = fs.readFileSync(htmlPath, 'utf-8');
      const cssLinkRegex = /<link rel="stylesheet".*?href="(\/assets\/[^"]+\.css)".*?>/;
      const match = html.match(cssLinkRegex);
      if (match) {
        const cssPath = path.resolve(__dirname, 'dist', match[1].replace(/^\//, ''));
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        html = html.replace(cssLinkRegex, `<style>${cssContent}</style>`);
        fs.writeFileSync(htmlPath, html);
        console.log('Inlined total CSS successfully!');
      }
    }
  };
}

const routesList = ['/'];

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      prerender({
        routes: routesList,
        renderer: new PuppeteerRenderer({
          renderAfterTime: 2000,
          headless: true,
        }),
        postProcess(renderedRoute) {
          if (renderedRoute.html) {
              renderedRoute.html = renderedRoute.html
               .replace(/data-server-rendered="true"/g, '')
               .replace(/http:\/\/127\.0\.0\.1:\d+\//g, 'https://vinicavalcanti.com/')
               .replace(/http:\/\/localhost:\d+\//g, 'https://vinicavalcanti.com/')
               .replace(/\?utm_source=direto(?:&|&amp;)sck=\d+_\d+/g, '')
               .replace(
                 /<script[^>]*src="https:\/\/connect\.facebook\.net\/[^"]*"[^>]*>\s*<\/script>/g,
                 ''
               )
               .replace(
                 /<script[^>]*src="https:\/\/api\.vinicavalcanti\.com\/(gtm|gtag|6wyopelvelg)[^"]*"[^>]*>\s*<\/script>/g,
                 ''
               )
               .replace(
                 /<script[^>]*src="https:\/\/capi-automation\.s3[^"]*"[^>]*>\s*<\/script>/g,
                 ''
               )
               .replace(/style="opacity: 0;[^"]*"/g, '')
               .replace(/style="[^"]*transform: translateX\(-?\d+\.?\d*%\)[^"]*"/g, '');
          }
        },
      }),
      {
        name: 'generate-sitemap',
        closeBundle() {
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routesList.map(route => `  <url><loc>https://vinicavalcanti.com${route}</loc></url>`).join('\n')}
</urlset>`;
          fs.writeFileSync(path.resolve(__dirname, 'dist', 'sitemap.xml'), sitemap);
        }
      },
      critical({
        criticalUrl: 'https://vinicavalcanti.com',
        criticalBase: './dist',
        criticalPages: [{ uri: '', template: 'index' }],
        criticalConfig: {
          inline: true,
          dimensions: [
            { width: 375, height: 800 },  // mobile
            { width: 1920, height: 1080 } // desktop
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      copyPublicDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'framer-motion', 'motion'],
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
