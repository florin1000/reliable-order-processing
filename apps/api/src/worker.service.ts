import { Injectable, OnModuleInit } from "@nestjs/common"
import { RabbitMqService } from "./rabbitmq.service"

@Injectable()
export class OrderStatusWorker implements OnModuleInit {
  constructor(private readonly rabbit: RabbitMqService) {}

  async onModuleInit() {
    const channel = this.rabbit.channel
    if (!channel) return

    await channel.consume("order-status", msg => {
      if (!msg) return
      // Placeholder: this will process status checks in the next commit
      channel.ack(msg)
    })
  }
}
