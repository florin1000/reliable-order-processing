export type OrderStatus = "pending" | "active" | "failed"

export interface OrderRecord {
  id: string
  action: "order" | "renew" | "cancel" | "transfer" | "suspend" | "modify"
  status: OrderStatus
  attempts: number
  lastCheckedAt?: number
}

export const orders: Record<string, OrderRecord> = {}
