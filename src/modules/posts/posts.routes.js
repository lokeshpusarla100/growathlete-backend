/**
 * Posts Module Routes
 *
 * Central routes file for the entire posts module.
 * Combines routes for post, comment, and like entities.
 */

// const express = require('express');
// const router = express.Router();

// const postController = require('./post/post.controller');
// const commentController = require('./comment/comment.controller');
// const likeController = require('./like/like.controller');

// const { authenticate } = require('../../shared/middleware/auth.middleware');
// const { validate } = require('../../shared/middleware/validate.middleware');
// const { createPostSchema, addCommentSchema } = require('./posts.validation');

// // ==================== POST ROUTES ====================

// /**
//  * @route   GET /api/v1/posts
//  * @desc    Get feed posts
//  * @access  Public
//  */
// router.get('/', postController.getFeed);

// /**
//  * @route   POST /api/v1/posts
//  * @desc    Create new post
//  * @access  Private
//  */
// router.post('/', authenticate, validate(createPostSchema), postController.create);

// /**
//  * @route   GET /api/v1/posts/:id
//  * @desc    Get single post
//  * @access  Public
//  */
// router.get('/:id', postController.getById);

// /**
//  * @route   DELETE /api/v1/posts/:id
//  * @desc    Delete post
//  * @access  Private (author only)
//  */
// router.delete('/:id', authenticate, postController.delete);

// // ==================== LIKE ROUTES ====================

// /**
//  * @route   POST /api/v1/posts/:id/like
//  * @desc    Toggle like on post
//  * @access  Private
//  */
// router.post('/:id/like', authenticate, likeController.toggleLike);

// // ==================== COMMENT ROUTES ====================

// /**
//  * @route   GET /api/v1/posts/:id/comments
//  * @desc    Get comments for a post
//  * @access  Public
//  */
// router.get('/:id/comments', commentController.getPostComments);

// /**
//  * @route   POST /api/v1/posts/:id/comments
//  * @desc    Add comment to post
//  * @access  Private
//  */
// router.post('/:id/comments', authenticate, validate(addCommentSchema), commentController.addComment);

// module.exports = router;
