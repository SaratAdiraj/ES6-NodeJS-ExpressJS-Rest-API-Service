# ExpressJS-ES6-Rest-API-Service

A fully modular, testable REST API boilerplate built using modern **ES6+ syntax** with support for:

- ✅ JSON Schema-based **runtime type enforcement** for DTOs (TypeScript-like safety, no compiler)
- ✅ A powerful `inherits()` utility for class-based schema validation and mixin composition
- ✅ Extensible storage system (uses File-based by default; pluggable to SQL/NoSQL via Adapter Pattern)
- ✅ Batch operations: Create, Update, Delete multiple users at once
- ✅ Wildcard search and listing functionality
- ✅ Swagger/OpenAPI integration for documentation
- ✅ Jest test suite (pure ES6, no Babel, no transpilers)

---

## 🧠 Unique Features

### 🔐 TypeScript-like DTO Enforcement — in Pure ES6

This project uses a custom-built `inherits()` utility which:

- Accepts **zero or more** JSON Schemas
- Accepts **zero or more** mixin/base classes
- Automatically validates constructor inputs using [AJV](https://github.com/ajv-validator/ajv)
- Provides static `.validate()` and `.errors` for manual checks
- Supports `Object.freeze()` to ensure immutability

```js
class UserDTO extends inherits(BaseClass, SchemaA, SchemaB, TimestampMixin) {}
```

This gives you runtime type guarantees without the need for TypeScript, Babel, or any compile step.

---

## 🚀 API Endpoints

| Method | Path               | Description                         |
|--------|--------------------|-------------------------------------|
| GET    | `/users`           | List all users                      |
| GET    | `/users/search`    | Search users with `?q=...`          |
| POST   | `/users/batch`     | Batch create users (array of DTOs)  |
| PUT    | `/users/batch`     | Batch update users (array of DTOs)  |
| DELETE | `/users/batch`     | Batch delete users (array of `{ id }`) |

---

## 🗂 Storage Layer (Pluggable)

Storage is abstracted using an **adapter-style interface**, currently implemented using a simple file-based store.

You can easily swap in:

- SQL (e.g., PostgreSQL, SQLite)
- NoSQL (e.g., MongoDB, DynamoDB)
- In-memory or external services

To add a new backend, simply implement the same methods as `FileStore.js`.

---

## 📦 Setup

```bash
git clone https://github.com/your-user/ExpressJS-ES6-Rest-API-Service.git
cd ExpressJS-ES6-Rest-API-Service
npm install
npm start
```

---

## 🧪 Run Tests

```bash
npm test
```

Includes full test coverage for:

- REST endpoints (`UserController.test.js`)
- `inherits` utility (`inherits.test.js`)

---

## 📜 Swagger/OpenAPI

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

Schema defined in [`swagger.yaml`](./swagger.yaml)

---

## 📁 .gitignore (example)

```bash
node_modules/
users.json
.env
```

---

## ✅ Summary

This project gives you:

- A modern, container- and serverless-ready Express.js starter
- Type-safe ES6 DTOs using JSON Schema + `inherits`
- Easy extension to real-world production backends

Enjoy TypeScript-level structure — with **zero TypeScript**.