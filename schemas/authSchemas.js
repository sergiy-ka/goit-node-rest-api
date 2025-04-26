import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': `"email" is required`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is required`
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': `"password" is required`,
        'string.min': `"password" should have a minimum length of {#limit}`,
        'any.required': `"password" is required`
    }),
    subscription: Joi.string().valid("starter", "pro", "business")
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': `"email" is required`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is required`
    }),
    password: Joi.string().required().messages({
        'string.empty': `"password" is required`,
        'any.required': `"password" is required`
    })
});

export const emailSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': `"email" is required`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is required`
    })
});