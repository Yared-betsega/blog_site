import Joi from 'joi';

export const validTagSchema = (instance: unknown) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  });
  const { error } = schema.validate(instance, { allowUnknown: true });
  return error;
};

export const validTagSchemaForUpdate = (instance: unknown) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  });
  const { error } = schema.validate(instance, { allowUnknown: true });
  return error;
};
