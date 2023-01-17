import { Request, Response, NextFunction} from "express";
import { paginate } from "../../utils/util";
import SuccessStoryResource from "./successStory.model";
export const addSuccessStoryResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const impactStoriesResources = await SuccessStoryResource.create(req.body);
      res.locals.json = { data: impactStoriesResources };
    } catch (error) {
      res.locals.json = { data: 'Something went wrong to add success story resources!' };
    }
    return next();
  };

export const getAllSuccessStoryResources = async (req: Request, res: Response, next: NextFunction) => {
    const filter = { name: '', title: '' };
    if (req.query.name) {
      const re = new RegExp(req.query.name as string, 'i');
      Object.assign(filter, { name: { $regex: re } });
    }
    if (req.query.title) {
      filter.title = req.query.title as string;
    }
    if (req.query.title) {
      filter.title = req.query.title as string;
    }
    const aggregation = [{ $match: filter }];
  
    const query = SuccessStoryResource.aggregate(aggregation);
    const paginatedResult = await paginate(req, query);
    res.locals.json = { data: paginatedResult };
    return next();
  };