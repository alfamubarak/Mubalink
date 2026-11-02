# Architecture

## How Next.js talks to Laravel

The two apps are deployed and run separately, and communicate **only over
HTTP** using a JSON REST API under `/api/v1`.

1. The browser loads the Next.js app (served on the app's public origin).
2. For data, the browser calls `/api/v1/...` on the **same origin**.
3. Next.js's `rewrites` rule (`frontend/next.config.ts`) proxies those calls
   to Laravel. In production both apps sit behind one domain; in development
   Next proxies to `http://localhost:8000`.
4. Laravel authenticates via **Sanctum SPA cookies** (HttpOnly, Secure,
   SameSite) — the session cookie is set by Laravel and sent back automatically
   by the browser. **No tokens are stored in `localStorage` or JS.**

This keeps requests same-origin (no CORS in normal operation) and means the
frontend has no knowledge of the database, prices, or subscription rules.

## Responsibilities

| Concern           | Owner   |
|-------------------|---------|
| UI / rendering    | Next.js |
| Auth / authz      | Laravel |
| Validation        | Laravel |
| Business logic    | Laravel |
| Database          | Laravel |
| Pricing / money   | Laravel (never the browser) |

## Backend layering

```
routes/api.php  →  Controller (HTTP only)  →  Form Request / Policy  →  Service  →  Model/DB
```

- **Routes** map verb + path to a controller — no logic.
- **Controllers** handle the HTTP request/response — no business rules.
- **Form Requests** validate incoming data.
- **Policies** enforce authorisation.
- **Services** hold business logic that spans multiple models (only where
  warranted — avoid over-abstraction).

## API versioning

All endpoints live under `/api/v1/`. A future breaking change is released as
`/api/v2/` so existing clients keep working.

## Future growth

Automatic voucher authentication and router/network-device integration will be
added later as **new Laravel modules** (new controllers/services/tables), not
as changes to the frontend, so the existing contract stays stable.
