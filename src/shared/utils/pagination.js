/**
 * Pagination Helper
 * 
 * Standardizes pagination across all list endpoints.
 * 
 * Usage:
 *   const { getPaginationParams, paginateQuery } = require('../../shared/utils/pagination');
 *   
 *   const { page, limit, skip } = getPaginationParams(req.query);
 *   const results = await paginateQuery(Model.find(filter), { page, limit });
 */

// /**
//  * Extract and validate pagination params from query
//  * @param {Object} query - req.query object
//  * @returns {{ page: number, limit: number, skip: number }}
//  */
// const getPaginationParams = (query) => {
//   const page = Math.max(1, parseInt(query.page) || 1);
//   const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
//   const skip = (page - 1) * limit;
  
//   return { page, limit, skip };
// };

// /**
//  * Execute a mongoose query with pagination
//  * @param {Query} query - Mongoose query
//  * @param {Object} options - { page, limit }
//  * @returns {Promise<{ data: any[], pagination: Object }>}
//  */
// const paginateQuery = async (query, { page, limit }) => {
//   const skip = (page - 1) * limit;
  
//   // Clone query for counting
//   const countQuery = query.model.find(query.getFilter());
//   const total = await countQuery.countDocuments();
  
//   const data = await query
//     .skip(skip)
//     .limit(limit)
//     .lean();
  
//   return {
//     data,
//     pagination: {
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit),
//       hasMore: page * limit < total
//     }
//   };
// };

// module.exports = {
//   getPaginationParams,
//   paginateQuery
// };
