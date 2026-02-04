import { orders, OrderRecord, OrderStatus } from "./orders.store"

const MAX_RETRIES = 3
const RETRY_INTERVAL_MS = 2000

function simulateMicrosoftStatus(order: OrderRecord): OrderStatus {
  if (order.attempts >= 2) {
    return "active"
  }
  return "pending"
}

export function createOrder(action: OrderRecord["action"]) {
  const id = `ord_${Date.now()}`
  orders[id] = { id, action, status: "pending", attempts: 0 }
  retryUntilActive(id)
  return orders[id]
}

export function listOrders() {
  return Object.values(orders)
}

function retryUntilActive(id: string) {
  const tick = () => {
    const order = orders[id]
    if (!order) return

    order.attempts += 1
    order.lastCheckedAt = Date.now()

    const status = simulateMicrosoftStatus(order)
    order.status = status

    if (status === "active") return
    if (order.attempts >= MAX_RETRIES) {
      order.status = "failed"
      return
    }
    setTimeout(tick, RETRY_INTERVAL_MS)
  }

  setTimeout(tick, RETRY_INTERVAL_MS)
}
