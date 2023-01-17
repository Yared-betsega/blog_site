import { Response, Request, NextFunction } from 'express';
import { paginate } from '../../utils/util';

import ImpactStoryResource from './impactStoryResource.model';
export const addImpactStoryResources = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const impactStoriesResources = await ImpactStoryResource.create(req.body);
    res.locals.json = { data: impactStoriesResources };
  } catch (error) {
    res.locals.json = { data: 'Something went wrong to add impact story resources!' };
  }
  return next();
};

export const getAllImpactStoryResources = async (req: Request, res: Response, next: NextFunction) => {
  const filter = { title: '', phase: '' };
  if (req.query.name) {
    const re = new RegExp(req.query.name as string, 'i');
    Object.assign(filter, { name: { $regex: re } });
  }
  if (req.query.title) {
    filter.title = req.query.title as string;
  }
  if (req.query.phase) {
    filter.phase = req.query.phase as string;
  }
  const aggregation = [{ $match: filter }];

  const query = ImpactStoryResource.aggregate(aggregation);
  const paginatedResult = await paginate(req, query);
  res.locals.json = { data: paginatedResult };
  return next();
};
