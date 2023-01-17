import { Request, Response, NextFunction } from 'express';
import { Partner } from './partner.model';
import { toInteger } from 'lodash';
import mongoose from 'mongoose';
import { paginate } from '../../helpers/paginator';
import Joi from 'joi';
import { validAddLinkSchema, validEditPartnerSchema, validPartnerSchema } from './partner.validator';

export const addPartner = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult: Joi.ValidationResult<unknown> = validPartnerSchema.validate(req.body);
  if (validationResult.error) {
    res.locals.json = {
      statusCode: 400,
      message: validationResult.error.message,
    };
    return next();
  }
  const partner = new Partner(req.body);
  await partner.save();
  res.locals.json = {
    statusCode: 201,
    data: partner,
  };
  return next();
};

export const getAllPartners = async (req: Request, res: Response, next: NextFunction) => {
  const query = Partner.aggregate();
  const paginatedResult = await paginate(req, query);
  res.locals.json = {
    statusCode: 200,
    data: paginatedResult,
  };
  return next();
};

export const getPartnerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findOne({ _id: id });
    if (!partner) {
      res.locals.json = {
        statusCode: 404,
        message: 'Partner not found!',
      };
      return next();
    }
    res.locals.json = {
      statusCode: 200,
      data: partner,
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

export const updatePartner = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult: Joi.ValidationResult<unknown> = validEditPartnerSchema.validate(req.body);
  if (validationResult.error) {
    res.locals.json = {
      statusCode: 400,
      message: validationResult.error.message,
    };
    return next();
  }
  try {
    const { id } = req.params;
    const partner = await Partner.findOne({ _id: id });
    if (!partner) {
      res.locals.json = {
        statusCode: 404,
        message: `Partner with id ${id} not found`,
      };
      return next();
    }
    partner.set(req.body);
    await partner.save();
    res.locals.json = {
      statusCode: 200,
      data: partner,
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

export const addPartnerLink = async (req: Request, res: Response, next: NextFunction) => {
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
    const socialMediaLinks: string = req.body;
    const partner = await Partner.findOne({ _id: id });
    if (!partner) {
      res.locals.json = {
        statusCode: 404,
        message: `Partner with id ${id} not found`,
      };
      return next();
    }
    await Partner.updateOne({ _id: id }, { $push: { socialMediaLinks: socialMediaLinks } });
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

export const deletePartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findOne({ _id: id });
    if (!partner) {
      res.locals.json = {
        statusCode: 404,
        message: `Partner with id ${id} not found`,
      };
      return next();
    }
    await partner.remove();
    res.locals.json = {
      statusCode: 200,
      data: partner,
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
