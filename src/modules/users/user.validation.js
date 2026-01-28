/**
 * User Validation - Request Validation Schemas
 * 
 * WHERE: Define validation rules for incoming requests.
 * WHAT:  Joi/Zod schemas for request body, params, query.
 * WHY:   Validate before hitting controller/service. Fail fast.
 * 
 * RULES:
 * - One schema per endpoint that needs validation
 * - Export schemas, use with validate middleware
 * - Keep validation rules clear and readable
 */

// const Joi = require('joi');

// /**
//  * Schema for updating user profile
//  * Used with: PATCH /api/v1/users/me
//  */
// const updateProfileSchema = Joi.object({
//   name: Joi.string()
//     .min(2)
//     .max(100)
//     .trim()
//     .optional(),
    
//   avatar: Joi.string()
//     .uri()
//     .optional()
//     .allow(null)
// });

// /**
//  * Schema for user ID param
//  * Used with: GET /api/v1/users/:id
//  */
// const userIdParamSchema = Joi.object({
//   id: Joi.string()
//     .pattern(/^[0-9a-fA-F]{24}$/)  // MongoDB ObjectId format
//     .required()
//     .messages({
//       'string.pattern.base': 'Invalid user ID format'
//     })
// });

// module.exports = {
//   updateProfileSchema,
//   userIdParamSchema
// };
