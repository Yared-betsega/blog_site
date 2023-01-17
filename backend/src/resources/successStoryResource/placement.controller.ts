import { Request, NextFunction, Response } from 'express';
import { Placement } from './successStory.model';

export const addPlacement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const placement = await Placement.create(req.body);
    res.locals.json = { data: placement };
  } catch (error) {
    res.locals.json = { data: 'Something went wrong!' };
  }
  return next();
};
export const getAllPlacements = async (req: Request, res: Response, next: NextFunction) => {
  const placements = await Placement.find();
  res.locals.json = { data: placements };
  return next();
};
