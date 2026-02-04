# Reliable Order Processing (Demo)

A compact demo repo that mirrors the article: migrating from **retries + cron** to **event-driven workflows** with RabbitMQ.

## What this shows
- Initial design: retry loop + cron polling
- Migration design: queue + worker + DLQ

## Tech stack
- Nest.js (API)
- Next.js (UI)

## Repo layout
```
/apps
  /api   (Nest.js)
  /web   (Next.js)
/docs
  architecture.md
  migration.md
/scripts
  demo.sh
```

## Notes
This is a learning/demo repo, not production-ready.

## Quickstart
1) Start API (Nest): `cd apps/api`
2) Start Web (Next): `cd apps/web`
3) Create an order: `POST /orders`
