import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import SQLiteStoreFactory from 'connect-sqlite3';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret';
const DB_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DB_DIR, 'app.db');
const SESSION_DB_PATH = path.join(DB_DIR, 'sessions.db');

fs.mkdirSync(DB_DIR, { recursive: true });

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
);
app.use(express.json());

const SQLiteStore = SQLiteStoreFactory(session);
app.set('trust proxy', 1);
app.use(
  session({
    store: new SQLiteStore({ db: path.basename(SESSION_DB_PATH), dir: DB_DIR }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

let db;

async function initDb() {
  db = await open({ filename: DB_PATH, driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `);

  const existing = await db.get('SELECT id FROM users WHERE username = ?', ['nwanbueze']);
  if (!existing) {
    const passwordHash = await bcrypt.hash('admin', 10);
    await db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [
      'nwanbueze',
      passwordHash,
    ]);
  }
}

function requireAuth(req, res, next) {
  if (req.session?.user?.id) {
    next();
    return;
  }
  res.status(401).json({ authenticated: false });
}

app.get('/api/session', (req, res) => {
  if (req.session?.user?.id) {
    res.json({ authenticated: true, username: req.session.user.username });
    return;
  }
  res.json({ authenticated: false });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required.' });
    return;
  }

  const user = await db.get('SELECT id, username, password_hash FROM users WHERE username = ?', [
    username,
  ]);
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials.' });
    return;
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    res.status(401).json({ error: 'Invalid credentials.' });
    return;
  }

  req.session.user = { id: user.id, username: user.username };
  res.json({ authenticated: true, username: user.username });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to logout.' });
      return;
    }
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

app.get('/api/admin/verify', requireAuth, (req, res) => {
  res.json({ ok: true });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Auth server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
