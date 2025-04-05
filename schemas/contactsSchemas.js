import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': `"name" is required`,
        'any.required': `"name" is required`
    }),
    email: Joi.string().email().required().messages({
        'string.empty': `"email" is required`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is required`
    }),
    phone: Joi.string().required().messages({
        'string.empty': `"phone" is required`,
        'any.required': `"phone" is required`
    }),
    favorite: Joi.boolean()
});

export const updateContactSchema = Joi.object({
    name: Joi.string().messages({
        'string.empty': `"name" cannot be an empty string`
    }),
    email: Joi.string().email().messages({
        'string.empty': `"email" cannot be an empty string`,
        'string.email': `"email" must be a valid email`
    }),
    phone: Joi.string().messages({
        'string.empty': `"phone" cannot be an empty string`
    }),
    favorite: Joi.boolean()
}).min(1).messages({
    'object.min': 'Body must have at least one field'
});

export const updateStatusSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        'any.required': `"favorite" is required`
    })
});