# Architecture (Draft)

Initial:
- API places order
- Retry loop checks status
- Cron polls pending orders

Target:
- API emits event
- Worker checks status
- Retry queue + DLQ
