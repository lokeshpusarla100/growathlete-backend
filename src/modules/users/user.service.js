/**
 * User Service - Business Logic
 *
 * WHERE: All business logic for users lives here.
 * WHAT:  Functions that manipulate data, enforce rules, call other services.
 * WHY:   Separates logic from HTTP concerns. Reusable and testable.
 *
 * RULES:
 * - No req/res objects here (those stay in controller)
 * - Call other modules through their SERVICES, not models
 * - Throw errors, don't send HTTP responses
 * - Can be called from multiple controllers or other services
 */

// const User = require('./user.model');
// const { NotFoundError, BadRequestError } = require('../../shared/utils/api-error');

// /**
//  * Find user by ID
//  * @param {string} userId - The user ID
//  * @returns {Promise<User>} - The user document
//  * @throws {NotFoundError} - If user not found
//  */
// const findById = async (userId) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new NotFoundError('User not found');
//   }
//   return user;
// };

// /**
//  * Find user by email
//  * @param {string} email - The email address
//  * @returns {Promise<User|null>} - The user or null
//  */
// const findByEmail = async (email) => {
//   return User.findOne({ email: email.toLowerCase() });
// };

// /**
//  * Create new user
//  * @param {Object} userData - User data
//  * @returns {Promise<User>} - Created user
//  */
// const create = async (userData) => {
//   const existingUser = await findByEmail(userData.email);
//   if (existingUser) {
//     throw new BadRequestError('Email already registered');
//   }
//   return User.create(userData);
// };

// /**
//  * Update user profile
//  * @param {string} userId - The user ID
//  * @param {Object} updateData - Data to update
//  * @returns {Promise<User>} - Updated user
//  */
// const updateProfile = async (userId, updateData) => {
//   const user = await User.findByIdAndUpdate(
//     userId,
//     { $set: updateData },
//     { new: true, runValidators: true }
//   );
//   if (!user) {
//     throw new NotFoundError('User not found');
//   }
//   return user;
// };

// /**
//  * Check if user can post (called by posts module)
//  * This is the "public door" other modules use
//  */
// const canUserPost = async (userId) => {
//   const user = await findById(userId);
//   return user.isActive && user.isVerified;
// };

// /**
//  * Increment user's post count (called by posts module)
//  */
// const incrementPostCount = async (userId) => {
//   await User.findByIdAndUpdate(userId, { $inc: { postsCount: 1 } });
// };

// module.exports = {
//   findById,
//   findByEmail,
//   create,
//   updateProfile,
//   canUserPost,        // Exposed for other modules
//   incrementPostCount  // Exposed for other modules
// };
