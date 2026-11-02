# API Reference

Base URL: `/api/v1`

All responses are JSON. Errors return a JSON body with a `message` field and
an appropriate HTTP status.

## Endpoint documentation format

Every endpoint is documented with:

- **Method + path**
- **Authentication / authorisation** required
- **Request fields** (name, type, validation rules)
- **Response** shape and **status codes**

---

## Health

### `GET /health`

Public liveness probe — no authentication.

**Response `200`**

```json
{
  "status": "ok",
  "version": "13.39.0",
  "timestamp": "2026-11-02T13:47:41+00:00"
}
```

---

## Authentication

All auth endpoints use **Sanctum SPA cookies** (HttpOnly). The frontend must
first fetch the CSRF cookie via `GET /sanctum/csrf-cookie`, then send the
`X-XSRF-TOKEN` header with the login request.

### `POST /auth/login`

Public. Rate-limited per IP (20/min) and per account (5/min).

| Field    | Type    | Rules                              |
|----------|---------|------------------------------------|
| email    | string  | required, valid email              |
| password | string  | required                           |
| remember | boolean | optional                           |

**`200`** on success:
```json
{ "data": { "id": 1, "name": "MubaLink Admin", "email": "admin@mubalink.ng" } }
```

**`422`** on invalid credentials — a generic message whether or not the email
exists (no user enumeration):
```json
{ "message": "The provided credentials are incorrect." }
```

**`429`** when rate limited.

### `GET /auth/me`

Requires authentication (`auth:sanctum`). Returns the current admin (`200`) or
`401` when unauthenticated.

### `POST /auth/logout`

Requires authentication. Invalidates the session and returns `200`:
```json
{ "message": "Logged out." }
```

---

_Additional endpoints (customers, packages, payments, subscriptions, Wi-Fi,
notifications, reports) will be documented here as each milestone is
implemented._
