# Lead Management System

This project is a simple Express.js API backed by PostgreSQL using Sequelize.

## Development

1. Copy `.env.example` to `.env` and set your database credentials.
2. Run migrations to create the schema:
   ```bash
   npm run migrate
   ```
3. Start the server in development mode (the project will sync models automatically):
   ```bash
   npm run dev
   ```

   Alternatively you can explicitly force a model sync with:
   ```bash
   npm run db:sync
   ```

   **Note:** the automatic `sync({ alter: true })` only runs when
   `NODE_ENV` is `development`. It is **disabled** in other environments to
   avoid accidental data loss.

## Production / Deployment

- **Do not** rely on `sequelize.sync()` in production. Instead generate and
  apply migrations using the Sequelize CLI (`npm run migrate`).
- Review migration files carefully; they are the source of truth for schema
  changes.
- Consider running migrations as part of your CI/CD pipeline or startup script.

## Database

Configuration is located in `src/config/db.js`. Pooling parameters and
logging are already conditionally managed based on `NODE_ENV`.

## Environment Variables

A sample list (create `.env` file):

```
PORT=4000
DB_NAME=lead_management_db
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development
```

## Logging

Winston is used and morgan streams into the logger. Logs are quieter in
production.

---

Feel free to expand this README with authentication, routes, etc.