import Joi from 'joi';

export default {
  locationWithMessage: {
    body: {
      message: Joi.string().required(),
      longitude: Joi.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).required(),
      latitude: Joi.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).required()
    }
  },
  closeMessages: {
    body: {
      longitude: Joi.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).required(),
      latitude: Joi.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).required(),
      radius:  Joi.number().required(),
    }
  },
  closestMessage: {
    body: {
      longitude: Joi.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).required(),
      latitude: Joi.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).required()
    }
  }
};
