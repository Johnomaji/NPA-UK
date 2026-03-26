import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;

if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
  console.error('ERROR: SESSION_SECRET environment variable is required in production.');
  process.exit(1);
}

const app = express();

// Security headers
app.use(helmet());

// CORS — tighten origins in production via environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: '50kb' }));

// Rate limiting on all API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Note: Authentication is handled by Supabase on the client side.
// Add server-side protected routes here if needed — verify Supabase JWTs
// via the Authorization header using @supabase/supabase-js on the server.

// Centralised error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
