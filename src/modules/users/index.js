/**
 * User Module Index - Module Exports
 *
 * WHERE: Central export point for the users module.
 * WHAT:  Export only what other modules should access.
 * WHY:   Clean interface, hides internal implementation.
 *
 * RULES:
 * - Export service (for other modules to call)
 * - Export routes (for app.js to register)
 * - NEVER export model (keeps coupling loose)
 */

// const userRoutes = require('./user.routes');
// const userService = require('./user.service');

// module.exports = {
//   routes: userRoutes,
//   service: userService
//   // NOT exporting model - other modules should use service
// };
