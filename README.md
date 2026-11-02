# MubaLink

Secure neighbourhood internet subscription management platform.

Two independent applications that communicate only over HTTP:

```
Browser ──▶ Next.js (frontend) ──▶ Laravel API (/api/v1) ──▶ MySQL
```

- **Laravel** owns all business logic, authentication, authorisation,
  validation and database access.
- **Next.js** renders the UI and never touches the database directly.

## Repository layout

```
mubalink/
  frontend/        # Next.js 16 (App Router) + TypeScript + Tailwind v4
  backend/         # Laravel 13 + Sanctum
  documentation/   # architecture, API and database docs
  README.md
```

## Versions

| Component | Version |
|-----------|---------|
| PHP       | 8.5.0   |
| Laravel   | 13.39.0 |
| Sanctum   | ^4.0    |
| Node      | 26.13.0 |
| Next.js   | 16.4.4  |
| React     | 19.3.0  |
| Tailwind  | 4.x     |
| Composer  | 2.8.12  |
| MySQL     | via Laravel Herd |

## Local development

### 1. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env          # then set DB_* for MySQL (or use SQLite for now)
php artisan key:generate
php artisan migrate
php artisan serve             # http://localhost:8000
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                   # http://localhost:3000
```

The frontend proxies `/api/*` to `http://localhost:8000` (see
`frontend/next.config.ts`), so requests are same-origin and CORS is avoided.

### 3. Verify

Open http://localhost:3000 — the health card should show
`status: ok` and the running Laravel version.

## Documentation

- [Architecture](documentation/architecture.md)
- [API](documentation/api.md)
