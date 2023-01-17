import { Request, Response } from 'express';

export const respond = async (req: Request, res: Response) => {
  return res.send(res.locals.json);
};
