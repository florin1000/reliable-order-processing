# Architecture

## Initial (Retries + Cron)
- API places order
- Retry loop checks status
- Cron polls pending orders

## Target (Event Pipeline)
- API emits event
- Worker checks status
- Retry queue + backoff
- DLQ for stuck orders

## Observability (Demo-level)
- Track attempts per order
- Record lastCheckedAt
- Capture DLQ reason
