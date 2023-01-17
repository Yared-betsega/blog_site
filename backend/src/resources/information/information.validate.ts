import Joi from 'joi';

export const validInformationSchema = (instance: unknown) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    note: Joi.string().min(10).required(),
    description: Joi.any(),
    phase: Joi.string().required(),
  });
  const { error } = schema.validate(instance, { allowUnknown: true });
  return error;
};

export const validInformationSchemaForUpdate = (instance: unknown) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    note: Joi.string().min(10),
    description: Joi.any(),
    phase: Joi.string().optional(),
  });
  const { error } = schema.validate(instance, { allowUnknown: true });
  return error;
};
