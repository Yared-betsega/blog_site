import { Request, NextFunction, Response } from 'express';
import { Content } from './successStory.model';

export const addContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await Content.create(req.body);
    res.locals.json = { data: content };
  } catch (error) {
    res.locals.json = { data: 'Something went wrong!' };
  }
  return next();
};
export const getAllContents = async (req: Request, res: Response, next: NextFunction) => {
  const contents = await Content.find();
  res.locals.json = { data: contents };
  return next();
};
