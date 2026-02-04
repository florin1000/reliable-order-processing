import { Injectable, OnModuleInit } from "@nestjs/common"
import { RabbitMqService } from "./rabbitmq.service"
import { getOrder, incrementAttempt, updateOrderStatus } from "./orders.service"

@Injectable()
export class OrderStatusWorker implements OnModuleInit {
  constructor(private readonly rabbit: RabbitMqService) {}

  async onModuleInit() {
    const channel = this.rabbit.channel
    if (!channel) return

    await channel.consume("order-status", msg => {
      if (!msg) return
      const orderId = msg.content.toString()
      const order = getOrder(orderId)
      if (!order) {
        channel.ack(msg)
        return
      }

      incrementAttempt(orderId)
      const status = order.attempts >= 3 ? "active" : "pending"
      updateOrderStatus(orderId, status)

      if (status === "pending") {
        setTimeout(() => this.rabbit.publishStatusCheck(orderId), 3000)
      }

      channel.ack(msg)
    })
  }
}
