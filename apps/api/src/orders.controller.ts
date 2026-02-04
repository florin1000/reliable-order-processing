import { Body, Controller, Get, Post } from "@nestjs/common"
import { createOrder, listOrders } from "./orders.service"
import { OrderRecord } from "./orders.store"

@Controller("orders")
export class OrdersController {
  @Post()
  create(@Body("action") action: OrderRecord["action"] = "order") {
    return createOrder(action)
  }

  @Get()
  all() {
    return listOrders()
  }
}
