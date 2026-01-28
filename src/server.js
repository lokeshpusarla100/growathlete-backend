// /**
//  * Server Entry Point
//  * 
//  * WHERE: src/server.js
//  * WHAT:  Starts the server and connects to database.
//  */

// const app = require('./app');
// const config = require('./config');
// const connectDB = require('./shared/database/connection');
// const logger = require('./shared/utils/logger');

// let server;

// const startServer = async () => {
//     try {
//         // 1. Connect to Database
//         await connectDB();

//         // 2. Start Server
//         server = app.listen(config.port, () => {
//             logger.info(`Server running in ${config.env} mode on port ${config.port}`);
//         });

//     } catch (error) {
//         logger.error(`Failed to start server: ${error.message}`);
//         process.exit(1);
//     }
// };

// // Handle unhandled promise rejections (crash safely)
// process.on('unhandledRejection', (err) => {
//     logger.error(`Unhandled Rejection: ${err.message}`);
//     if (server) {
//         server.close(() => process.exit(1));
//     } else {
//         process.exit(1);
//     }
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//     logger.error(`Uncaught Exception: ${err.message}`);
//     process.exit(1);
// });

// startServer();
