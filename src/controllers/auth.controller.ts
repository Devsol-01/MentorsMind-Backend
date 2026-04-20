import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.register(req.body);
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ status: 'error', message: 'refreshToken required' });
      return;
    }
    const data = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
}

export async function me(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = await authService.getMe(req.user!.userId);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
}

export function logout(_req: Request, res: Response) {
  // JWT is stateless — client drops the token; optionally add a blocklist here
  res.status(200).json({ status: 'success', message: 'Logged out' });
}
