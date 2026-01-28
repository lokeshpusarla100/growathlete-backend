// /**
//  * MongoDB Connection
//  * 
//  * WHERE: src/shared/database/connection.js
//  * WHAT:  Handles actual connection to MongoDB using config values.
//  * WHY:   Separates "HOW to connect" (logic) from "WHERE to connect" (config).
//  */

// const mongoose = require('mongoose');
// const config = require('../../config');
// const logger = require('../utils/logger'); // We'll create a simple logger too

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(config.db.uri, config.db.options);

//         console.log(`MongoDB Connected: ${conn.connection.host}`);

//         // Handle connection events
//         mongoose.connection.on('error', (err) => {
//             console.error(`MongoDB connection error: ${err}`);
//         });

//         mongoose.connection.on('disconnected', () => {
//             console.log('MongoDB disconnected');
//         });

//         // Graceful shutdown
//         process.on('SIGINT', async () => {
//             await mongoose.connection.close();
//             console.log('MongoDB connection closed through app termination');
//             process.exit(0);
//         });

//         return conn;
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1); // Exit process with failure
//     }
// };

// module.exports = connectDB;
