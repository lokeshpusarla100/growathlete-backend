/**
 * Post Service - Business Logic
 * 
 * Entity: Post
 * Handles: Creating posts, fetching feed, updating counts
 * 
 * NOTE: This service calls OTHER services for cross-module data (loose coupling)
 */

// const Post = require('./post.model');
// const userService = require('../../users/user.service');  // Call service, not model
// const notificationService = require('../../notifications/notification.service');
// const { NotFoundError, ForbiddenError } = require('../../../shared/utils/api-error');

// /**
//  * Create a new post
//  */
// const create = async (userId, postData) => {
//   // Get author info through user SERVICE (loose coupling)
//   const author = await userService.findById(userId);
  
//   const post = await Post.create({
//     author: userId,
//     authorSnapshot: {
//       name: author.name,
//       avatar: author.avatar,
//       isVerified: author.isVerified
//     },
//     content: postData.content,
//     media: postData.media || []
//   });
  
//   // Notify followers (don't await - fire and forget)
//   notificationService.notifyFollowers(userId, 'new_post', post._id).catch(console.error);
  
//   return post;
// };

// /**
//  * Get feed posts (paginated)
//  */
// const getFeed = async (options = {}) => {
//   const { page = 1, limit = 10 } = options;
  
//   return Post.find()
//     .sort({ createdAt: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .lean();
// };

// /**
//  * Get single post by ID
//  */
// const findById = async (postId) => {
//   const post = await Post.findById(postId);
//   if (!post) throw new NotFoundError('Post not found');
//   return post;
// };

// /**
//  * Delete post (only author can delete)
//  */
// const deletePost = async (postId, userId) => {
//   const post = await findById(postId);
  
//   if (post.author.toString() !== userId) {
//     throw new ForbiddenError('Not authorized to delete this post');
//   }
  
//   await Post.findByIdAndDelete(postId);
//   return { deleted: true };
// };

// /**
//  * Increment comment count (called by comment service)
//  */
// const incrementCommentCount = async (postId) => {
//   await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
// };

// /**
//  * Update like count (called by like service)
//  */
// const updateLikeCount = async (postId, increment) => {
//   await Post.findByIdAndUpdate(postId, { $inc: { likesCount: increment } });
// };

// module.exports = {
//   create,
//   getFeed,
//   findById,
//   deletePost,
//   incrementCommentCount,  // For comment service
//   updateLikeCount         // For like service
// };
