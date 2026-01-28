/**
 * Async Handler Wrapper
 *
 * Wraps async route handlers to catch errors automatically.
 * Eliminates try/catch in every controller.
 *
 * Usage:
 *   const asyncHandler = require('../../shared/utils/async-handler');
 *   router.get('/', asyncHandler(async (req, res) => {
 *     // No try/catch needed - errors go to error middleware
 *     const data = await someAsyncOperation();
 *     res.json(data);
 *   }));
 */

// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// module.exports = asyncHandler;
