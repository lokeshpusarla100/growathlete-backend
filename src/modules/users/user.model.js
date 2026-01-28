/**
 * User Model - Mongoose Schema
 *
 * WHERE: This file defines the database schema for the User collection.
 * WHAT:  Only schema definition, indexes, and mongoose hooks.
 * WHY:   Keeps data structure separate from business logic.
 *
 * RULES:
 * - No business logic here (put in service)
 * - No request/response handling (put in controller)
 * - Only this module should import this model directly
 */

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 8,
//     select: false  // Never return password by default
//   },
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   avatar: {
//     type: String,
//     default: null
//   },
//   role: {
//     type: String,
//     enum: ['athlete', 'coach', 'scout', 'admin'],
//     default: 'athlete'
//   },
//   authProvider: {
//     type: String,
//     enum: ['email', 'google', 'microsoft'],
//     default: 'email'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true  // Adds createdAt, updatedAt
// });

// // Indexes
// userSchema.index({ email: 1 });
// userSchema.index({ role: 1 });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);
