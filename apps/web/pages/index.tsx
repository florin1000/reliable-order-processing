import { useEffect, useState } from "react"

type Order = {
  id: string
  action: string
  status: string
  attempts: number
  lastCheckedAt?: number
}

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then(res => res.json())
      .then(setOrders)
      .catch(() => setOrders([]))
  }, [])

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Reliable Order Processing (Demo)</h1>
      <p>Initial flow: retry loop for pending orders.</p>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.id} — {order.action} — {order.status} — attempts: {order.attempts}
          </li>
        ))}
      </ul>
    </main>
  )
}
