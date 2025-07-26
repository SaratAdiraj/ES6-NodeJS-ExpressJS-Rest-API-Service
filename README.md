# ExpressJS-ES6-Rest-API-Service

A clean, modular, and extensible **Node.js REST API service** using **ExpressJS**, written entirely in modern **ES6+** syntax without Babel. It uses **JSON Schema** to define DTOs and validate incoming requests, and follows a **controller/service/storage pattern** that supports dependency injection and clean separation of concerns.

## 🔧 Features

- ✅ **ES6 Modules** — Clean syntax using `import/export`, no Babel required
- ✅ **JSON Schema as Interfaces** — DTOs validated against schemas using `Ajv`
- ✅ **Controller/Service Architecture** — Separation of logic layers
- ✅ **Extensible Storage** — Use in-memory, file-based, SQL, or NoSQL backends with the adapter-like storage interface
- ✅ **Batch Support** — Create, update, delete users in bulk
- ✅ **Wildcard Search** — Filter users by partial name or email match
- ✅ **Jest Tests** — Full test suite using Jest + Supertest (no Babel)
- ✅ **Swagger Docs** — Auto-generated OpenAPI docs via `swagger-ui-express`
- ✅ **Serverless Compatible** — No singleton globals, can be easily deployed to containers or serverless platforms

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Run the API server
npm start

# Run tests
npm test
```

## 📚 API Endpoints

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/api/users`         | List all users                     |
| POST   | `/api/users/batch`   | Batch insert users                 |
| PUT    | `/api/users/batch`   | Batch update users                 |
| DELETE | `/api/users/batch`   | Batch delete users                 |
| GET    | `/api/users/search`  | Search users by wildcard criteria  |

## 📖 Swagger Docs

After starting the server, view API docs at:

```
http://localhost:3000/api-docs
```

Swagger YAML is located at: `swagger.yaml`

## 🗃 Storage Interface

The system uses an **abstract `Storage` interface** (adapter pattern) to support multiple backends.

Default backend is a **JSON file-based store**, but you can extend it for:

- 🔌 SQL (e.g., PostgreSQL, MySQL)
- 🌱 NoSQL (e.g., MongoDB)
- ☁️ Cloud-native storage

Just implement the `Storage` class methods: `list()`, `get(id)`, `add(user)`, `update(id, user)`, `delete(id)`.

## ✅ Test Coverage

```bash
npm test
```

Includes:
- Valid and invalid input tests
- Batch operations
- Wildcard search and deletion

## 🗂 Folder Structure

```
.
├── controllers/
├── services/
├── stores/
├── models/
├── __tests__/
├── swagger.yaml
├── index.js
└── README.md
```

## 🔐 .gitignore

Make sure these are in `.gitignore`:

```
node_modules/
users.json
.env
```

## 📜 License

MIT