# Migration Steps

## 1) Baseline (Retries + Cron)
- Keep retry loop in API for quick feedback
- Cron polls pending orders in the background

## 2) Add Queue + Worker (Parallel)
- Introduce RabbitMQ
- Worker consumes status-check events
- Keep cron as safety net for a short period

## 3) Cut Over
- Stop retry loop
- Disable cron polling
- Use queue + worker for all status transitions

## 4) Hardening (Demo-level)
- Add DLQ for stuck orders
- Track attempts + timestamps
- Document failure reasons
