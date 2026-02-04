import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { CronRecoveryService } from "./cron.service"

@Module({
  controllers: [OrdersController],
  providers: [CronRecoveryService],
})
export class AppModule {}
