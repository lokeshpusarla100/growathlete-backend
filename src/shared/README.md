# Shared Folder Guide

> Quick reference for what goes where in the shared folder.

---

## Folder Structure

```
shared/
├── middleware/     # Request processing before controllers
├── utils/          # Helper functions and classes
├── constants/      # Static values and enums
└── database/       # DB connection and plugins
```

---

## /middleware - What Goes Here

| File | Purpose | When to Use |
|------|---------|-------------|
| `auth.middleware.js` | JWT verification, role checks | Protecting private routes |
| `error.middleware.js` | Global error handler | Catches all thrown errors |
| `validate.middleware.js` | Request validation with Joi/Zod | Validating req.body, params, query |
| `upload.middleware.js` | File upload handling (multer) | Profile pictures, post images |
| `rateLimit.middleware.js` | API rate limiting | Prevent abuse (add later) |

**Rule:** If it processes the request BEFORE the controller, it's middleware.

---

## /utils - What Goes Here

| File | Purpose | When to Use |
|------|---------|-------------|
| `api-response.js` | Consistent response format | Every controller response |
| `api-error.js` | Custom error classes | Throwing errors in services |
| `async-handler.js` | Wraps async routes | Eliminate try/catch in controllers |
| `pagination.js` | Pagination helpers | Any list endpoint |
| `logger.js` | Winston/Pino logger | Logging throughout app |
| `email.js` | Email sending helper | Verification, notifications |
| `token.js` | JWT sign/verify helpers | Auth module |

**Rule:** If it's a helper function used by 2+ modules, it goes here.

---

## /constants - What Goes Here

| File | Purpose | Example Content |
|------|---------|-----------------|
| `sports.js` | Sport types enum | `['football', 'basketball', 'cricket', ...]` |
| `http-status.js` | HTTP status codes | `{ OK: 200, CREATED: 201, ... }` |
| `error-messages.js` | Reusable error strings | `{ USER_NOT_FOUND: 'User not found', ... }` |
| `roles.js` | User roles | `['athlete', 'coach', 'scout', 'admin']` |
| `config.js` | App-wide config values | Pagination defaults, file size limits |

**Rule:** If it's a static value needed by multiple modules, it goes here.

---

## /database - What Goes Here

| File | Purpose |
|------|---------|
| `connection.js` | MongoDB connection setup |
| `plugins/pagination.plugin.js` | Mongoose plugin for pagination |
| `plugins/toJSON.plugin.js` | Mongoose plugin to clean JSON output |

---

## Quick Decision Guide

```
I need to...                           Put it in...
────────────────────────────────────────────────────────────
Check JWT token                     →  middleware/auth.middleware.js
Handle errors globally              →  middleware/error.middleware.js
Format API responses                →  utils/api-response.js
Throw custom errors                 →  utils/api-error.js
Paginate database queries           →  utils/pagination.js
Define sport types                  →  constants/sports.js
Connect to MongoDB                  →  database/connection.js
````

---

## NOT in Shared (Goes in Module)

| This... | Goes in Module |
|---------|----------------|
| User validation schema | `users/user.validation.js` |
| Post creation logic | `posts/post/post.service.js` |
| Tournament routes | `tournaments/tournaments.routes.js` |
| Auth-specific helpers | `auth/auth.utils.js` (inside auth module) |

**Rule:** If it's specific to ONE module, keep it in that module.
