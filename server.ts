import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { runShieldLanceAnalysis } from './src/server/analyzerCore';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support up to 10MB JSON body for screenshot uploads
  app.use(express.json({ limit: '10mb' }));

  // Handler function for analysis API
  const handleAnalyzeRequest = async (req: express.Request, res: express.Response) => {
    const { text, imageBase64, mimeType } = req.body || {};
    const result = await runShieldLanceAnalysis(text, imageBase64, mimeType);

    if (result.error) {
      return res.status(result.status || 500).json({ error: result.error });
    }

    return res.status(200).json(result.data);
  };

  // Mount both Netlify function path and standard API path
  app.post('/.netlify/functions/analyze', handleAnalyzeRequest);
  app.post('/api/analyze', handleAnalyzeRequest);

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'ShieldLance' });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ShieldLance server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
