// /**
//  * App Setup
//  * 
//  * WHERE: src/app.js
//  * WHAT:  Configures Express, middleware, and routes.
//  */

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const compression = require('compression');
// const config = require('./config');
// const errorHandler = require('./shared/middleware/error.middleware');
// const { ApiResponse } = require('./shared/utils/api-response');

// // Import Module Routes
// const userRoutes = require('./modules/users/user.routes');
// const postRoutes = require('./modules/posts/posts.routes');
// // ... import other module routes here

// const app = express();

// // 1. Global Middleware
// app.use(helmet()); // Security headers
// app.use(cors({ origin: config.app.clientUrl })); // CORS
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(compression()); // Gzip compression

// // 2. Health Check
// app.get('/health', (req, res) => {
//     res.status(200).json({ status: 'ok', timestamp: new Date() });
// });

// // 3. API Routes (Mount modules)
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/posts', postRoutes);

// // 4. 404 Handler (for unknown routes)
// app.use((req, res, next) => {
//     ApiResponse.error(res, 'Route not found', 404);
// });

// // 5. Global Error Handler (Must be last)
// app.use(errorHandler);

// module.exports = app;
// // \