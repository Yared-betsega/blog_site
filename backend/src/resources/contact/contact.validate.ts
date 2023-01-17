import Joi from 'joi';
import { IContactInterface } from './contact.model';

export const contactValidator = (contact: IContactInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    subject: Joi.string().min(5).max(1000).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).max(3600).required(),
    phase: Joi.string().required(),
  });

  return schema.validate(contact);
};

exports.contactValidator = contactValidator;
