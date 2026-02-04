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


## 📚 Exploring the Migration Story

This repo tells a story through commits. Each commit represents one step in the migration from retries+cron to event-driven architecture.

### The Evolution (in order)
1) Bootstrap repo — `b4f6d0a`
2) Add retry loop — `cfa5aa9`
3) Add cron polling — `7ba7667`
4) Introduce RabbitMQ — `d8eafcc`
5) Replace with queue worker — `76d6ed3`
6) Add DLQ handling — `8d1dae1`

### How to Explore
Option 1: Compare specific commits
```
# Compare retry approach vs queue approach
git diff cfa5aa9..76d6ed3 apps/api/src/orders.service.ts
```

Option 2: Check out and run different versions
```
# See the retry+cron version
git checkout 7ba7667
npm install && npm run dev

# See the queue version
git checkout 76d6ed3
docker compose up -d
npm install && npm run dev
```

Key files to compare:
- `apps/api/src/orders.service.ts` — Order logic evolution
- `apps/api/src/worker.service.ts` — Queue consumer (later commits)
- `apps/api/src/cron.service.ts` — Cron polling (removed in final version)

## 🔀 Compare Approaches

**Legacy approach (retries + cron):**  
Branch: [`legacy-retries-cron`](https://github.com/florin1000/reliable-order-processing/tree/legacy-retries-cron)

**Modern approach (queue + workers):**  
Branch: [`main`](https://github.com/florin1000/reliable-order-processing/tree/main)

**Key differences:**
- Retry logic: scattered `setTimeout` → centralized queue
- Polling: `setInterval` cron → event-driven workers
- Failure handling: silent failures → Dead Letter Queue
- Observability: logs → structured queue metrics
