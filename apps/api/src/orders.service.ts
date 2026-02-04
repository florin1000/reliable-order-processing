import { orders, OrderRecord, OrderStatus } from "./orders.store"

import { RabbitMqService } from "./rabbitmq.service"

export function createOrder(action: OrderRecord["action"], rabbit?: RabbitMqService) {
  const id = `ord_${Date.now()}`
  orders[id] = { id, action, status: "pending", attempts: 0 }
  rabbit?.publishStatusCheck(id)
  return orders[id]
}

export function listOrders() {
  return Object.values(orders)
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const order = orders[id]
  if (!order) return
  order.status = status
  order.lastCheckedAt = Date.now()
}

export function incrementAttempt(id: string) {
  const order = orders[id]
  if (!order) return
  order.attempts += 1
  order.lastCheckedAt = Date.now()
}

export function getOrder(id: string) {
  return orders[id]
}
