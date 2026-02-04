import { Body, Controller, Get, Post } from "@nestjs/common"
import { createOrder, listOrders } from "./orders.service"
import { RabbitMqService } from "./rabbitmq.service"
import { OrderRecord } from "./orders.store"

@Controller("orders")
export class OrdersController {
  constructor(private readonly rabbit: RabbitMqService) {}
  @Post()
  create(@Body("action") action: OrderRecord["action"] = "order") {
    return createOrder(action, this.rabbit)
  }

  @Get()
  all() {
    return listOrders()
  }
}
