import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { RegisterBody, LoginBody, AuthResponse, JwtPayload } from '../types/auth.types';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret';
const JWT_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

function signTokens(payload: JwtPayload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
  return { token, refreshToken };
}

export async function register(body: RegisterBody): Promise<AuthResponse> {
  const { name, email, password, role } = body;

  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) throw Object.assign(new Error('Email already in use'), { statusCode: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, stellar_public_key, created_at`,
    [name, email, passwordHash, role]
  );

  const user = result.rows[0];
  const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
  const { token, refreshToken } = signTokens(payload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      stellarPublicKey: user.stellar_public_key,
      createdAt: user.created_at,
    },
    token,
    refreshToken,
  };
}

export async function login(body: LoginBody): Promise<AuthResponse> {
  const { email, password } = body;

  const result = await pool.query(
    `SELECT id, name, email, role, password_hash, stellar_public_key, created_at
     FROM users WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];
  if (!user) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
  const { token, refreshToken } = signTokens(payload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      stellarPublicKey: user.stellar_public_key,
      createdAt: user.created_at,
    },
    token,
    refreshToken,
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<{ token: string }> {
  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload;
    const token = jwt.sign(
      { userId: payload.userId, email: payload.email, role: payload.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return { token };
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { statusCode: 401 });
  }
}

export async function getMe(userId: string) {
  const result = await pool.query(
    `SELECT id, name, email, role, stellar_public_key, created_at FROM users WHERE id = $1`,
    [userId]
  );
  const user = result.rows[0];
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    stellarPublicKey: user.stellar_public_key,
    createdAt: user.created_at,
  };
}
