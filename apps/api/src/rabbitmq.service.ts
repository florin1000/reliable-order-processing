import { Injectable, OnModuleInit } from "@nestjs/common"
import amqp, { Connection, Channel } from "amqplib"

@Injectable()
export class RabbitMqService implements OnModuleInit {
  connection: Connection | null = null
  channel: Channel | null = null

  async onModuleInit() {
    try {
      this.connection = await amqp.connect("amqp://localhost:5672")
      this.channel = await this.connection.createChannel()
      await this.channel.assertQueue("order-status", { durable: true })
      await this.channel.assertQueue("order-status-dlq", { durable: true })
    } catch {
      // Demo only: keep app running even if RabbitMQ is not up
    }
  }
}

  async publishStatusCheck(orderId: string) {
    if (!this.channel) return
    this.channel.sendToQueue("order-status", Buffer.from(orderId), { persistent: true })
  }

  async publishDlq(orderId: string, reason: string) {
    if (!this.channel) return
    const payload = JSON.stringify({ orderId, reason })
    this.channel.sendToQueue("order-status-dlq", Buffer.from(payload), { persistent: true })
  }
