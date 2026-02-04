import { Injectable, OnModuleInit } from "@nestjs/common"
import { orders } from "./orders.store"

const CRON_INTERVAL_MS = 10000

@Injectable()
export class CronRecoveryService implements OnModuleInit {
  onModuleInit() {
    setInterval(() => {
      Object.values(orders).forEach(order => {
        if (order.status === "pending") {
          order.attempts += 1
          order.lastCheckedAt = Date.now()

          if (order.attempts >= 5) {
            order.status = "active"
          }
        }
      })
    }, CRON_INTERVAL_MS)
  }
}
