/**
 * API Response Helper
 *
 * Provides consistent response format across all endpoints.
 *
 * Usage:
 *   const { ApiResponse } = require('../../shared/utils/api-response');
 *   ApiResponse.success(res, data, 'User created', 201);
 *   ApiResponse.error(res, 'Not found', 404);
 */

// class ApiResponse {
//   /**
//    * Send success response
//    * @param {Response} res - Express response object
//    * @param {any} data - Response data
//    * @param {string} message - Success message
//    * @param {number} statusCode - HTTP status code (default: 200)
//    */
//   static success(res, data, message = 'Success', statusCode = 200) {
//     return res.status(statusCode).json({
//       success: true,
//       message,
//       data
//     });
//   }

//   /**
//    * Send error response
//    * @param {Response} res - Express response object
//    * @param {string} message - Error message
//    * @param {number} statusCode - HTTP status code (default: 500)
//    * @param {any} errors - Additional error details
//    */
//   static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
//     return res.status(statusCode).json({
//       success: false,
//       message,
//       errors
//     });
//   }

//   /**
//    * Send paginated response
//    * @param {Response} res - Express response object
//    * @param {any} data - Array of items
//    * @param {Object} pagination - { page, limit, total }
//    */
//   static paginated(res, data, pagination) {
//     const { page, limit, total } = pagination;
//     return res.status(200).json({
//       success: true,
//       data,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//         hasMore: page * limit < total
//       }
//     });
//   }
// }

// module.exports = { ApiResponse };
