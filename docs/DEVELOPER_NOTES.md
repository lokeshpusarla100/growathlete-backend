# GrowAthlete Developer Notes

> Practical guidelines for the team. Read this before writing code.

---

## 1. Loose Coupling vs Tight Coupling

### What is Coupling?

Coupling = How much one piece of code DEPENDS on another piece of code.

```
TIGHT COUPLING (Bad)
────────────────────────────────────────
Module A knows EVERYTHING about Module B
- Knows its internal functions
- Knows its database models
- When B changes, A breaks

LOOSE COUPLING (Good)
────────────────────────────────────────
Module A only knows Module B's "public door"
- Calls B through its service
- Doesn't care how B works internally
- B can change internals, A still works
```

---

### Real Example: Posts Module Needs User Data

#### ❌ TIGHT COUPLING (Never do this)

```javascript
// posts/post/post.service.js

// WRONG: Directly importing User model from another module
const User = require('../../users/user.model');

const createPost = async (userId, content) => {
  // WRONG: Directly querying another module's database
  const user = await User.findById(userId);
  
  // WRONG: Knowing internal structure of User model
  if (!user.settings.canPost) {
    throw new Error('Cannot post');
  }
  
  // WRONG: Directly updating another module's data
  await User.findByIdAndUpdate(userId, { $inc: { postsCount: 1 } });
  
  return Post.create({ author: userId, content });
};
```

**Why is this bad?**
- If User model changes field name from `settings.canPost` to `permissions.posting`, Posts module BREAKS
- If User collection moves to a different database, Posts module BREAKS
- You can't test Posts module without setting up User collection
- 10 modules doing this = nightmare to maintain

---

#### ✅ LOOSE COUPLING (Always do this)

```javascript
// posts/post/post.service.js

// RIGHT: Import only the SERVICE, not the model
const userService = require('../../users/user.service');

const createPost = async (userId, content) => {
  // RIGHT: Ask user module "can this user post?"
  const canPost = await userService.canUserPost(userId);
  
  if (!canPost) {
    throw new Error('Cannot post');
  }
  
  // RIGHT: Ask user module to update user's post count
  await userService.incrementPostCount(userId);
  
  return Post.create({ author: userId, content });
};
```

```javascript
// users/user.service.js

// User module exposes ONLY what others need
const canUserPost = async (userId) => {
  const user = await User.findById(userId);
  return user?.settings?.canPost ?? false; // Internal logic stays here
};

const incrementPostCount = async (userId) => {
  await User.findByIdAndUpdate(userId, { $inc: { postsCount: 1 } });
};

module.exports = { canUserPost, incrementPostCount, /* ... */ };
```

**Why is this good?**
- Posts module doesn't know User's internal structure
- User module can change field names, Posts doesn't care
- Easy to test Posts with a mock userService
- Clear boundaries between modules

---

### The Golden Rules

| Rule | Do This | Not This |
|------|---------|----------|
| **Import models** | Only within same module | Never from other modules |
| **Cross-module data** | Call other module's service | Query other module's model |
| **Shared logic** | Put in `shared/utils/` | Duplicate across modules |
| **Common middleware** | Put in `shared/middleware/` | Copy-paste in each module |

---

### Coupling Cheat Sheet

```
When I need...                    I should...
─────────────────────────────────────────────────────────────
User data in Posts module      →  Call userService.getUser(id)
Validate tournament exists     →  Call tournamentService.exists(id)
Check if user follows someone  →  Call followService.isFollowing(a, b)
Send notification from Posts   →  Call notificationService.send(...)
Shared validation logic        →  Put in shared/utils/validation.js
```

---

## 2. MongoDB & Mongoose Guidelines

### Creating a New Collection

#### Step 1: Create the Model File

```javascript
// modules/users/user.model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your fields
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false  // Don't return password by default
  },
  avatar: String,
  role: {
    type: String,
    enum: ['athlete', 'coach', 'scout', 'admin'],
    default: 'athlete'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true  // Adds createdAt, updatedAt automatically
});

// Add indexes for frequently queried fields
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
```

#### Step 2: Collection is Created Automatically

MongoDB creates the collection when you first insert a document. No manual creation needed!

```javascript
// This creates 'users' collection automatically
await User.create({ email: 'test@example.com', name: 'Test' });
```

---

### Embed vs Reference Decision

```
┌─────────────────────────────────────────────────────────────────┐
│                  WHEN TO EMBED (Inside document)                │
├─────────────────────────────────────────────────────────────────┤
│ ✓ Data is ALWAYS fetched together                               │
│ ✓ Data is SMALL (won't grow beyond 100 items)                   │
│ ✓ Data RARELY changes independently                             │
│ ✓ One-to-few relationship (1 user has 1-5 addresses)            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              WHEN TO REFERENCE (Separate collection)            │
├─────────────────────────────────────────────────────────────────┤
│ ✓ Data can grow UNBOUNDED (user can have 10000 posts)           │
│ ✓ Data is queried INDEPENDENTLY (show all comments)             │
│ ✓ Data changes FREQUENTLY                                       │
│ ✓ Many-to-many relationship (users ↔ tournaments)               │
└─────────────────────────────────────────────────────────────────┘
```

**GrowAthlete Examples:**

| Data | Decision | Why |
|------|----------|-----|
| Athletic details in Athlete | **Embed** | Always shown together, small, rarely changes |
| Posts by a user | **Reference** | Can grow to thousands, queried separately |
| Achievements for athlete | **Reference** | Queried in lists, can grow |
| Message in chatroom | **Reference** | Unbounded, need pagination |

---

### Schema Design Patterns

#### Pattern 1: Denormalize for Read Performance

```javascript
// Instead of joining on every read...
const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Store frequently-needed author info directly
  authorSnapshot: {
    name: String,
    avatar: String,
    isVerified: Boolean
  },
  
  content: String
});

// Update snapshot when user profile changes
// (in user.service.js)
const updateProfile = async (userId, data) => {
  await User.findByIdAndUpdate(userId, data);
  
  // Update all posts with new info
  await Post.updateMany(
    { author: userId },
    { 'authorSnapshot.name': data.name, 'authorSnapshot.avatar': data.avatar }
  );
};
```

#### Pattern 2: Store Counts for Performance

```javascript
const postSchema = new mongoose.Schema({
  // Instead of counting likes every time
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  
  // Increment on like/comment
  // await Post.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });
});
```

---

## 3. Creating New Modules (Future Guide)

### When Do You Need a New Module?

Ask yourself:

```
1. Is this a NEW FEATURE AREA? (e.g., "Sponsorships", "Training Plans")
   → YES → Create new module

2. Is this an EXTENSION of existing feature? (e.g., "Post polls")
   → NO → Add to existing module (posts/poll subfolder)

3. Does it have its OWN DATA that doesn't belong elsewhere?
   → YES → Needs its own collection(s)
```

---

### Step-by-Step: Creating a New Module

**Example:** Adding a "Sponsorships" feature

#### Step 1: Decide Module Type

```
Simple Module (flat files):
- Few entities (1-2)
- Limited functionality
Example: sponsorships/ with just sponsorship.model.js, etc.

Complex Module (entity subfolders):
- Multiple entities (3+)
- Each entity has distinct logic
Example: sponsorships/deal/, sponsorships/offer/, sponsorships/contract/
```

#### Step 2: Create Folder Structure

```bash
# Simple module
mkdir -p src/modules/sponsorships

# Complex module
mkdir -p src/modules/sponsorships/{deal,offer,contract}
```

#### Step 3: Create Files

Each entity needs these files (create empty, fill later):

```
entity/
├── entity.model.js       # Mongoose schema
├── entity.service.js     # Business logic
├── entity.controller.js  # Request handlers
├── entity.routes.js      # HTTP endpoints (only at module root usually)
└── entity.validation.js  # Joi/Zod schemas
```

#### Step 4: Register Routes

```javascript
// src/app.js
const sponsorshipRoutes = require('./modules/sponsorships/sponsorship.routes');

app.use('/api/v1/sponsorships', sponsorshipRoutes);
```

---

### When Do You Need a New Collection?

```
┌─────────────────────────────────────────────────────────────────┐
│                     CREATE NEW COLLECTION IF:                   │
├─────────────────────────────────────────────────────────────────┤
│ 1. Data is queried INDEPENDENTLY                                │
│    "Show me all sponsorship deals" → Needs own collection       │
│                                                                 │
│ 2. Data can GROW UNBOUNDED                                      │
│    User can have 1000 sponsorship offers → Separate collection  │
│                                                                 │
│ 3. Data has MANY-TO-MANY relationship                           │
│    Users ↔ Sponsors (many users, many sponsors) → Junction table│
│                                                                 │
│ 4. Data needs its OWN INDEXES                                   │
│    Search sponsors by industry → Needs indexed collection       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     DON'T CREATE COLLECTION IF:                 │
├─────────────────────────────────────────────────────────────────┤
│ 1. Data is ALWAYS fetched with parent                           │
│    User's privacy settings → Embed in User                      │
│                                                                 │
│ 2. Data is SMALL and BOUNDED                                    │
│    User's 3-5 social media links → Embed as array               │
│                                                                 │
│ 3. Data BELONGS to exactly one parent                           │
│    Athlete's physical stats → Embed in Athlete                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Future Features: Decision Examples

| Feature | Module Decision | Collection Decision |
|---------|-----------------|---------------------|
| **Training Plans** | New module `training/` | `trainingPlans`, `exercises` (separate - can grow) |
| **Sponsorship Deals** | New module `sponsorships/` | `sponsors`, `deals`, `offers` (separate entities) |
| **User Settings** | NO new module, add to `users/` | NO new collection, embed in User |
| **Post Polls** | NO new module, add `posts/poll/` subfolder | `polls` collection (queried independently) |
| **DMs/Private Messages** | New module `messages/` | `conversations`, `directMessages` |
| **Endorsements** | Could be `athletes/endorsement/` OR new module | `endorsements` (queried separately) |

---

## 4. Quick Reference

### File Naming Convention

```
module-name/
├── entity/
│   ├── entity.model.js          # Mongoose schema
│   ├── entity.service.js        # Business logic  
│   ├── entity.controller.js     # HTTP handlers
│   └── entity.validation.js     # Request validation
├── module-name.routes.js        # All routes for module
└── index.js                     # Module exports
```

### Import Rules

```javascript
// ✅ ALLOWED
const userService = require('../users/user.service');        // Service
const { ApiError } = require('../../shared/utils/api-error'); // Shared
const Post = require('./post.model');                        // Same module

// ❌ NEVER
const User = require('../users/user.model');                 // Other module's model
const { someHelper } = require('../posts/post.service');     // Internal function
```

### Common Shared Utilities

| Utility | Purpose | Location |
|---------|---------|----------|
| `ApiResponse` | Consistent response format | `shared/utils/api-response.js` |
| `ApiError` | Custom error classes | `shared/utils/api-error.js` |
| `asyncHandler` | Wrap async routes | `shared/utils/async-handler.js` |
| `pagination` | Paginate queries | `shared/utils/pagination.js` |
| `authMiddleware` | Verify JWT | `shared/middleware/auth.middleware.js` |
| `validateMiddleware` | Validate requests | `shared/middleware/validate.middleware.js` |

---

## 5. Required Collections (GrowAthlete)

These are the 13 MongoDB collections needed for the app:

| # | Collection | Why We Need It |
|---|------------|----------------|
| 1 | `users` | Base accounts for ALL users (login, auth, basic profile). Every role uses this. |
| 2 | `athletes` | Athlete-specific data (sport, level, bio). Separate because not all users are athletes. |
| 3 | `posts` | Feed posts created by users. Core social feature. |
| 4 | `comments` | Comments on posts. Separate because can grow unbounded, needs pagination. |
| 5 | `likes` | Post likes. Separate because need unique constraint (1 like per user per post). |
| 6 | `follows` | Who follows whom. Separate because many-to-many relationship. |
| 7 | `achievements` | Athlete achievements/awards. Separate because queried in lists, grows over time. |
| 8 | `tournaments` | Tournament/event listings. Core discovery feature. |
| 9 | `registrations` | Who registered for which tournament. Separate because many-to-many. |
| 10 | `news` | Sports news articles. Admin/editorial content, different from user posts. |
| 11 | `chatrooms` | Live chat room metadata. Stores room info, not messages. |
| 12 | `messages` | Chat messages. Separate because unbounded growth per room. |
| 13 | `notifications` | User alerts/notifications. Separate because queried per user, grows over time. |

### Collection → Module Mapping

```
Collection        →  Module that owns it
─────────────────────────────────────────
users             →  users/
athletes          →  athletes/
posts             →  posts/post/
comments          →  posts/comment/
likes             →  posts/like/
follows           →  follows/
achievements      →  achievements/
tournaments       →  tournaments/tournament/
registrations     →  tournaments/registration/
news              →  news/
chatrooms         →  chatrooms/room/
messages          →  chatrooms/message/
notifications     →  notifications/
```

