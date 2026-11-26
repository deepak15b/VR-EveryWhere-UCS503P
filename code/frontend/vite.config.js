import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    {
      name: 'mock-api-server',
      configureServer(server) {
        // Intercept all /api calls directly in Vite
        // Prevents proxy ECONNREFUSED / AggregateError when standalone frontend runs without Spring Boot
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            res.setHeader('Content-Type', 'application/json');

            if (req.url.startsWith('/api/history') || req.url.startsWith('/api/favorites')) {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'Recorded successfully in mock session.' }));
              return;
            }

            if (req.url.startsWith('/api/auth/login') || req.url.startsWith('/api/auth/register')) {
              let body = '';
              req.on('data', (chunk) => { body += chunk; });
              req.on('end', () => {
                let parsed = {};
                try { parsed = JSON.parse(body); } catch (e) {}
                const user = {
                  id: `usr_${Date.now()}`,
                  username: parsed.username || 'explorer',
                  name: parsed.name || parsed.username || 'Explorer',
                  email: parsed.email || `${parsed.username || 'user'}@travel.com`,
                  role: 'USER',
                  joinedDate: 'November 2026'
                };
                res.statusCode = 200;
                res.end(JSON.stringify({
                  token: `jwt-${Date.now()}`,
                  user
                }));
              });
              return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify({ status: 'ok', message: 'VR Everywhere API operational.' }));
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});
