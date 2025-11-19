import type { Request, Response, NextFunction } from 'express';

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.sendStatus(401);
  if (!(req.user as any).is_admin) {
    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }
  next();
}

export function authorizeUserSelfOrAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.sendStatus(401);
  const idParam = Number(req.params.id);
  const userId = (req.user as any).id;
  const isAdmin = (req.user as any).is_admin;
  if (isAdmin || userId === idParam) {
    next();
  } else {
    return res.status(403).json({ message: 'Permissão negada.' });
  }
}
