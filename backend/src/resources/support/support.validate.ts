import Joi from 'joi';
import { IsupportInterface } from './support.model';

export const supportValidator = (contact: IsupportInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    way: Joi.string().valid('Q&A', 'Recruit', 'Mentor', 'Other').required(),
    experience: Joi.string().required(),
  });

  return schema.validate(contact);
};

exports.supportValidator = supportValidator;
