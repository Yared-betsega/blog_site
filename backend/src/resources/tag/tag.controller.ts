import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Tag from './tag.model';
import { validTagSchema, validTagSchemaForUpdate } from './tag.validate';

export const addTag = async (req: Request, res: Response, next: NextFunction) => {
  const tag = new Tag(req.body);

  try {
    const newTag = await Tag.create(req.body);
    await validTagSchema(tag);
    res.locals.json = {
      statusCode: 201,
      data: newTag,
    };
    tag.save();
  } catch (error) {
    res.locals.json = {
      statusCode: 404,
      data: 'Bad request!',
    };
  }

  return next();
};

export const getAllTag = async (req: Request, res: Response, next: NextFunction) => {
  const response = await Tag.find({});
  res.locals.json = {
    statusCode: 200,
    data: response,
  };
  return next();
};

export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        message: 'Invalid Id',
      };
      return next();
    }

    const tag = await Tag.findOne({ _id: req.params.id });
    if (!tag) {
      res.locals.json = {
        statusCode: 404,
        message: 'Tag with id ${id} is not found',
      };
      return next();
    }
    tag.set(req.body);
    await validTagSchemaForUpdate(tag);
    res.locals.json = {
      statusCode: 200,
      data: tag,
    };
  } catch (error) {
    res.locals.json = { data: 'Bad request!' };
  }
  return next();
};
