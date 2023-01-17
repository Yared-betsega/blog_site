import { NextFunction, Request, Response } from 'express';
import { paginate } from '../../helpers/paginator';
import { Event } from './event.model';
import { Aggregate } from 'mongoose';
import { validAddLinkSchema, validEditEventSchema, validEventSchema } from './event.validator';
import Joi from 'joi';

interface Dictionary {
  [key: string]: unknown;
}

export const addEvent = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult: Joi.ValidationResult<unknown> = validEventSchema.validate(req.body);
  if (validationResult.error) {
    res.locals.json = {
      statusCode: 400,
      message: validationResult.error.message,
    };
    return next();
  }
  const event = new Event(req.body);
  await event.save();
  res.locals.json = {
    statusCode: 201,
    data: event,
  };
  return next();
};
export const fetchAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  const filter: Dictionary = {};
  if (req.query.phase) {
    filter.phase = req.query.phase;
  }
  const query: Aggregate<unknown[]> = Event.aggregate([{ $match: filter }]);
  const paginatedResult = await paginate(req, query);
  res.locals.json = {
    statusCode: 200,
    data: paginatedResult,
  };
  return next();
};
export const fetchEventByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    if (!event) {
      res.locals.json = {
        statusCode: 404,
        message: 'Event not found!',
      };
      return next();
    }
    res.locals.json = {
      statusCode: 200,
      data: event,
    };
    return next();
  } catch (error) {
    res.locals.json = {
      statusCode: 400,
      message: 'Please enter a valid ID',
    };
    return next();
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult: Joi.ValidationResult<unknown> = validEditEventSchema.validate(req.body);
  if (validationResult.error) {
    res.locals.json = {
      statusCode: 400,
      message: validationResult.error.message,
    };
    return next();
  }
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    if (!event) {
      res.locals.json = {
        statusCode: 404,
        message: `Event with the given id is not found`,
      };
      return next();
    }
    event.set(req.body);
    await event.save();
    res.locals.json = {
      statusCode: 200,
      data: event,
    };
    return next();
  } catch (error) {
    res.locals.json = {
      statusCode: 400,
      message: 'Please enter a valid ID',
    };
    return next();
  }
};

export const addEventLink = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult: Joi.ValidationResult<unknown> = validAddLinkSchema.validate(req.body);
  if (validationResult.error) {
    res.locals.json = {
      statusCode: 400,
      message: validationResult.error.message,
    };
    return next();
  }
  try {
    const { id } = req.params;
    const link: string = req.body;
    const event = await Event.findOne({ _id: id });
    if (!event) {
      res.locals.json = {
        statusCode: 404,
        message: `Event with the given id is not found`,
      };
      return next();
    }
    await Event.updateOne({ _id: id }, { $push: { links: link } });
    res.locals.json = {
      statusCode: 200,
      message: 'Link successfully added',
    };
    return next();
  } catch (error) {
    res.locals.json = {
      statusCode: 400,
      message: 'Please enter a valid ID',
    };
    return next();
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    if (!event) {
      res.locals.json = {
        statusCode: 404,
        message: `Event with the given id is not found`,
      };
      return next();
    }
    await event.remove();
    res.locals.json = {
      statusCode: 200,
      data: event,
    };
    return next();
  } catch (error) {
    res.locals.json = {
      statusCode: 400,
      message: 'Please enter a valid ID',
    };
    return next();
  }
};
