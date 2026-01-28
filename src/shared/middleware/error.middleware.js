/**
 * Error Handling Middleware
 * 
 * Global error handler - catches all errors thrown in routes.
 * Must be registered LAST in app.js middleware chain.
 * 
 * Usage in app.js:
 *   const errorHandler = require('./shared/middleware/error.middleware');
 *   // ... all routes ...
 *   app.use(errorHandler);  // Must be last
 */

// const { ApiError } = require('../utils/api-error');

// const errorHandler = (err, req, res, next) => {
//   // Log error for debugging (consider using logger in production)
//   console.error('Error:', err);

//   // Handle known operational errors
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//       ...(err.errors && { errors: err.errors })
//     });
//   }

//   // Handle Mongoose validation errors
//   if (err.name === 'ValidationError') {
//     const errors = Object.values(err.errors).map(e => e.message);
//     return res.status(400).json({
//       success: false,
//       message: 'Validation failed',
//       errors
//     });
//   }

//   // Handle Mongoose duplicate key error
//   if (err.code === 11000) {
//     const field = Object.keys(err.keyValue)[0];
//     return res.status(409).json({
//       success: false,
//       message: `${field} already exists`
//     });
//   }

//   // Handle Mongoose cast error (invalid ObjectId)
//   if (err.name === 'CastError') {
//     return res.status(400).json({
//       success: false,
//       message: `Invalid ${err.path}: ${err.value}`
//     });
//   }

//   // Handle unknown errors (don't leak details in production)
//   const isDev = process.env.NODE_ENV === 'development';
  
//   return res.status(500).json({
//     success: false,
//     message: isDev ? err.message : 'Internal server error',
//     ...(isDev && { stack: err.stack })
//   });
// };

// module.exports = errorHandler;
