import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { RabbitMqService } from "./rabbitmq.service"
import { OrderStatusWorker } from "./worker.service"

@Module({
  controllers: [OrdersController],
  providers: [RabbitMqService, OrderStatusWorker],
})
export class AppModule {}
