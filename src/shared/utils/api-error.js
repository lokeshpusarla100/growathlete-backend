/**
 * Custom API Errors
 * 
 * Custom error classes for different HTTP error types.
 * Thrown in services, caught by error middleware.
 * 
 * Usage:
 *   const { NotFoundError, BadRequestError } = require('../../shared/utils/api-error');
 *   throw new NotFoundError('User not found');
 */

// class ApiError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isOperational = true;  // Distinguishes from programming errors
    
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// class BadRequestError extends ApiError {
//   constructor(message = 'Bad request') {
//     super(message, 400);
//   }
// }

// class UnauthorizedError extends ApiError {
//   constructor(message = 'Unauthorized') {
//     super(message, 401);
//   }
// }

// class ForbiddenError extends ApiError {
//   constructor(message = 'Forbidden') {
//     super(message, 403);
//   }
// }

// class NotFoundError extends ApiError {
//   constructor(message = 'Not found') {
//     super(message, 404);
//   }
// }

// class ConflictError extends ApiError {
//   constructor(message = 'Conflict') {
//     super(message, 409);
//   }
// }

// class ValidationError extends ApiError {
//   constructor(message = 'Validation failed', errors = []) {
//     super(message, 422);
//     this.errors = errors;
//   }
// }

// module.exports = {
//   ApiError,
//   BadRequestError,
//   UnauthorizedError,
//   ForbiddenError,
//   NotFoundError,
//   ConflictError,
//   ValidationError
// };
