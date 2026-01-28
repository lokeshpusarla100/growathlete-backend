/**
 * Post Model - Mongoose Schema
 * 
 * Entity: Post (the main feed posts)
 * Collection: posts
 */

// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
  
//   // Denormalized author data for fast reads
//   authorSnapshot: {
//     name: { type: String, required: true },
//     avatar: String,
//     isVerified: { type: Boolean, default: false }
//   },
  
//   content: {
//     type: String,
//     required: true,
//     maxlength: 5000
//   },
  
//   media: [{
//     type: { type: String, enum: ['image', 'video'] },
//     url: String
//   }],
  
//   // Denormalized counts for performance
//   likesCount: { type: Number, default: 0 },
//   commentsCount: { type: Number, default: 0 },
//   repostsCount: { type: Number, default: 0 },
//   viewsCount: { type: Number, default: 0 },
  
//   // Repost tracking
//   isRepost: { type: Boolean, default: false },
//   originalPost: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post'
//   }
// }, {
//   timestamps: true
// });

// // Indexes for common queries
// postSchema.index({ createdAt: -1 });  // Feed sorting
// postSchema.index({ author: 1, createdAt: -1 });  // User's posts

// module.exports = mongoose.model('Post', postSchema);
