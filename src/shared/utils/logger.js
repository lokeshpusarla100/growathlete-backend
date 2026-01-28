/**
 * Simple Logger Wrapper
 * 
 * WHERE: src/shared/utils/logger.js
 * WHAT:  Wraps console.log/error (replaceable with Winston later).
 */

const logger = {
    info: (msg) => console.log(`[INFO] ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
    debug: (msg) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] ${msg}`);
        }
    }
};

module.exports = logger;
