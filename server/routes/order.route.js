import { Router } from "express";
import orderController from '../controllers/order.controller.js'

export const orderRouter = Router()

orderRouter.get('/order/:id', orderController.get_orders)
orderRouter.post('/order/checkout/:id', orderController.checkout)
orderRouter.post('/paymentverification', orderController.paymentVerification)