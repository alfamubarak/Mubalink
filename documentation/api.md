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

_Additional endpoints (auth, customers, packages, payments, subscriptions,
Wi-Fi, notifications, reports) will be documented here as each milestone is
implemented._
