/**
 * User Controller - HTTP Request Handlers
 *
 * WHERE: Handles incoming HTTP requests and sends responses.
 * WHAT:  Parse request, call service, format response.
 * WHY:   Separates HTTP concerns from business logic.
 *
 * RULES:
 * - Only handle req/res here
 * - Never write business logic here (put in service)
 * - Always call service for data operations
 * - Use ApiResponse for consistent responses
 * - Use next(error) for error handling
 */

// const userService = require('./user.service');
// const { ApiResponse } = require('../../shared/utils/api-response');

// /**
//  * Get current user's profile
//  * GET /api/v1/users/me
//  */
// const getMe = async (req, res, next) => {
//   try {
//     const user = await userService.findById(req.user.id);
//     return ApiResponse.success(res, user, 'Profile fetched');
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Get user by ID
//  * GET /api/v1/users/:id
//  */
// const getById = async (req, res, next) => {
//   try {
//     const user = await userService.findById(req.params.id);
//     return ApiResponse.success(res, user);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Update current user's profile
//  * PATCH /api/v1/users/me
//  */
// const updateMe = async (req, res, next) => {
//   try {
//     // Only pass validated data to service
//     const { name, avatar } = req.body;
//     const user = await userService.updateProfile(req.user.id, { name, avatar });
//     return ApiResponse.success(res, user, 'Profile updated');
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getMe,
//   getById,
//   updateMe
// };
