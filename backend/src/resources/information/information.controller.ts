import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Information from './information.model';
import { validInformationSchema, validInformationSchemaForUpdate } from './information.validate';

export const addInformation = async (req: Request, res: Response, next: NextFunction) => {
  const information = new Information(req.body);

  try {
    const newInformation = await Information.create(req.body);
    await validInformationSchema(information);
    res.locals.json = {
      statusCode: 201,
      data: newInformation,
    };
    information.save();
  } catch (error) {
    res.locals.json = {
      statusCode: 404,
      data: 'Bad request!',
    };
  }

  return next();
};

export const getAllInformation = async (req: Request, res: Response, next: NextFunction) => {
  const response = await Information.find({});
  res.locals.json = {
    statusCode: 200,
    data: response,
  };
  return next();
};

export const getInformationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        message: 'Invalid ID',
      };
      return next();
    }

    const information = await Information.findOne({ _id: req.params.id });

    if (!information) {
      res.locals.json = {
        statusCode: 404,
        message: 'Information not found',
      };
      return next();
    }
    res.locals.json = {
      statusCode: 200,
      data: information,
    };
    return next();
  } catch (err) {
    res.locals.json = {
      statusCode: 500,
      message: 'Server failed',
    };
    return next();
  }
};

export const updateInformation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        message: 'Invalid Id',
      };
      return next();
    }

    const information = await Information.findOne({ _id: req.params.id });
    if (!information) {
      res.locals.json = {
        statusCode: 404,
        message: 'Information with id ${id} is not found',
      };
      return next();
    }
    information.set(req.body);
    await validInformationSchemaForUpdate(information);
    res.locals.json = {
      statusCode: 200,
      data: information,
    };
  } catch (error) {
    res.locals.json = { data: 'Bad request!' };
  }
  return next();
};

export const deleteInformation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.locals.json = {
        statusCode: 400,
        message: 'Invalid Id',
      };
      return next();
    }

    const information = await Information.findOne({ _id: req.params.id });
    if (!information) {
      res.locals.json = {
        statusCode: 404,
        message: 'Information with id ${id} is not found',
      };
      return next();
    }
    information.remove();
    res.locals.json = {
      statusCode: 200,
      data: information,
    };
  } catch (error) {
    res.locals.json = {
      statusCode: 500,
      data: 'Bad request!',
    };
  }
  return next();
};
