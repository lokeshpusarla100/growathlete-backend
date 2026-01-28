/**
 * Authentication Middleware
 * 
 * Verifies JWT token and attaches user to request.
 * 
 * Usage:
 *   const { authenticate, optionalAuth } = require('../../shared/middleware/auth.middleware');
 *   router.get('/private', authenticate, controller.privateRoute);
 *   router.get('/public', optionalAuth, controller.publicRoute);  // User available if logged in
 */

// const jwt = require('jsonwebtoken');
// const { UnauthorizedError } = require('../utils/api-error');
// const config = require('../../config');

// /**
//  * Required authentication
//  * Throws error if no valid token
//  */
// const authenticate = async (req, res, next) => {
//   try {
//     // Get token from header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedError('No token provided');
//     }
    
//     const token = authHeader.split(' ')[1];
    
//     // Verify token
//     const decoded = jwt.verify(token, config.jwtSecret);
    
//     // Attach user info to request
//     req.user = {
//       id: decoded.userId,
//       role: decoded.role
//     };
    
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return next(new UnauthorizedError('Invalid token'));
//     }
//     if (error.name === 'TokenExpiredError') {
//       return next(new UnauthorizedError('Token expired'));
//     }
//     next(error);
//   }
// };

// /**
//  * Optional authentication
//  * Attaches user if valid token exists, otherwise continues
//  */
// const optionalAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return next();  // No token, continue without user
//     }
    
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, config.jwtSecret);
    
//     req.user = {
//       id: decoded.userId,
//       role: decoded.role
//     };
//   } catch (error) {
//     // Invalid token, but optional - continue without user
//   }
  
//   next();
// };

// /**
//  * Role-based authorization
//  * Usage: router.delete('/:id', authenticate, authorize('admin'), controller.delete);
//  */
// const authorize = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return next(new UnauthorizedError('Authentication required'));
//     }
    
//     if (!allowedRoles.includes(req.user.role)) {
//       return next(new UnauthorizedError('Insufficient permissions'));
//     }
    
//     next();
//   };
// };

// module.exports = {
//   authenticate,
//   optionalAuth,
//   authorize
// };
