/**
 * User Routes - HTTP Endpoint Definitions
 *
 * WHERE: Define all HTTP endpoints for the users module.
 * WHAT:  Map HTTP methods + paths to controller functions.
 * WHY:   Keeps routing separate from handling logic.
 *
 * RULES:
 * - Only define routes here
 * - Apply middleware (auth, validation) here
 * - No business logic
 * - Follow RESTful conventions
 */

// const express = require('express');
// const router = express.Router();

// const userController = require('./user.controller');
// const { authenticate } = require('../../shared/middleware/auth.middleware');
// const { validate } = require('../../shared/middleware/validate.middleware');
// const { updateProfileSchema } = require('./user.validation');

// /**
//  * @route   GET /api/v1/users/me
//  * @desc    Get current user's profile
//  * @access  Private
//  */
// router.get('/me', authenticate, userController.getMe);

// /**
//  * @route   PATCH /api/v1/users/me
//  * @desc    Update current user's profile
//  * @access  Private
//  */
// router.patch('/me', authenticate, validate(updateProfileSchema), userController.updateMe);

// /**
//  * @route   GET /api/v1/users/:id
//  * @desc    Get user by ID (public profile)
//  * @access  Public
//  */
// router.get('/:id', userController.getById);

// module.exports = router;
