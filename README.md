# Lead Management System

This repository contains an Express.js REST API for managing insurance leads.
The backend uses PostgreSQL with Sequelize as the ORM, JWT for authentication,
and Swagger for interactive API documentation.

---

## 🔧 Getting Started

### Prerequisites

- Node.js 18+ (or compatible)
- PostgreSQL server accessible with credentials in `.env`
- `npm` or `yarn` to install packages

### Setup

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Arun12kumar/lead_management_sysytem.git
   cd lead_management_sysytem
   npm install
   ```
2. Copy `.env.example` to `.env` and set database credentials plus JWT keys:
   ```ini
   PORT=4000
   DB_NAME=lead_management_db
   DB_USER=postgres
   DB_PASSWORD=password
   DB_HOST=localhost
   DB_PORT=5432
   NODE_ENV=development
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRES_IN=7d
   ```
3. Create the database (Postgres CLI or GUI) matching `DB_NAME`.
4. Apply migrations:
   ```bash
   npm run migrate
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
   The server will listen on `http://localhost:4000` and load models
   automatically from `src/models`.

### Running in Production

- Build your container or deploy the code as usual. Ensure environment is
  `NODE_ENV=production` and run migrations at startup (either via `npm run
  migrate` or a migration runner).
- **Do not use `sequelize.sync()` in production**; it is disabled by design.

---

## 📁 Folder Structure

```
lead_management_sysytem/
├── src/
│   ├── config/          # configuration files (db, swagger)
│   ├── controllers/     # request handlers
│   ├── middlewares/     # express middleware (auth, validation)
│   ├── models/          # Sequelize model definitions
│   ├── migrations/      # Sequelize CLI migration scripts
│   ├── routes/          # express route definitions
│   ├── services/        # business logic and database access
│   └── utils/           # logging, helpers, etc.
├── logs/                # output from winston (if configured)
├── package.json
├── README.md            # you are here
└── TEST_CREDENTIALS.md  # sample requests and credentials
```

Add new modules under `src/` and remember to keep the directory structure
consistent. Models placed in `src/models` will be autoloaded on server start.

---

## 📚 API Documentation

Interactive docs are available via Swagger at:

```
http://localhost:4000/api/docs
```

Use the UI to explore endpoints, try sample payloads, and view response
schemas. All endpoints requiring authentication use a `Bearer` token obtained
from `POST /api/auth/login`.

---

## 🧩 Key Concepts

- **Authentication:** JWT tokens generated on login (`/api/auth/login`).
- **Lead lifecycle:** New leads can be created, updated, listed, soft-deleted,
  and converted to quotes.
- **Database schema:** Managed via Sequelize migrations. New models should be
  accompanied by a migration.
- **Logging:** Winston and Morgan are configured; logs go to console/file as
  appropriate.

---

## 🛠 Development Tips

- After editing or adding a model, run `npm run migrate` or create a new
  migration with `npx sequelize-cli migration:generate --name describe_change`.
- Use the `LeadService` class for business logic; controllers are thin wrappers
  that call service methods and handle HTTP details.
- Validators are located in `src/middlewares` (e.g. `leadValidators.js`)
  and can be reused across routes.

---

## 🚀 Working with the Team

1. Always pull the latest migrations before starting work.
2. Write a migration for any schema change and commit it alongside the
   corresponding model update.
3. Add or update Swagger comments in route files so documentation stays up to
   date. The docs regenerate on server restart.
4. Use `TEST_CREDENTIALS.md` for quick curl/js snippets during manual testing.

---

## ✅ Testing (future work)

This repo currently has no automated tests. Adding unit and integration tests
(isolated `LeadService` tests, controller request specs, etc.) is highly
encouraged. Use Jest or Mocha as preferred.

---

Feel free to expand or adapt this README as the project grows.