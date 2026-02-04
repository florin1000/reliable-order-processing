import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { CronRecoveryService } from "./cron.service"
import { RabbitMqService } from "./rabbitmq.service"
import { OrderStatusWorker } from "./worker.service"

@Module({
  controllers: [OrdersController],
  providers: [CronRecoveryService, RabbitMqService, OrderStatusWorker],
})
export class AppModule {}
