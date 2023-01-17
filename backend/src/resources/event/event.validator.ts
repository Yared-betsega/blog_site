import Joi, { ObjectSchema } from 'joi';

export const validEventSchema: ObjectSchema<unknown> = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    description: Joi.string().min(10).required(),
    eventType: Joi.string().valid('CONTEST', 'Q&A', 'PRODUCT RELEASE').required(),
    links: Joi.any(),
    gallery: Joi.string(),
    phase: Joi.string().required(),
  });
  
  export const validEditEventSchema: ObjectSchema<unknown> = Joi.object({
    name: Joi.string().optional(),
    title: Joi.string().optional(),
    start: Joi.date(),
    end: Joi.date(),
    description: Joi.string().min(10),
    eventType: Joi.string().valid('CONTEST', 'Q&A', 'PRODUCT RELEASE'),
    links: Joi.any(),
    gallery: Joi.string().optional(),
    phase: Joi.string().optional(),
  });
  
  export const validAddLinkSchema: ObjectSchema<unknown> = Joi.object({
    link: Joi.string().required(),
  });
  