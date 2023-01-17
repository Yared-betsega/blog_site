import Joi, { ObjectSchema } from 'joi';

export const validPartnerSchema: ObjectSchema<unknown> = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(10),
  socialMediaLinks: Joi.any(),
  banner: Joi.string(),
  slug: Joi.string().required(),
  logo_sm: Joi.string(),
  logo_lg: Joi.string(),
  companySize: Joi.string(),
  website: Joi.string(),
  tags: Joi.any(),
  industry: Joi.string(),
});

export const validEditPartnerSchema: ObjectSchema<unknown> = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional().min(10),
  socialMediaLinks: Joi.any(),
  companySize: Joi.string().optional(),
  banner: Joi.string().optional(),
  logo_sm: Joi.string().optional(),
  logo_lg: Joi.string().optional(),
  website: Joi.string().optional(),
  tags: Joi.any(),
  industry: Joi.string().optional(),
  slug: Joi.string().optional(),
});

export const validAddLinkSchema: ObjectSchema<unknown> = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
});
