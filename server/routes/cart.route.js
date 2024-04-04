import { Router } from "express";
import cartController from '../controllers/cart.controller.js'

export const cartRouter = Router()

cartRouter.get('/fetchCart/:id', cartController.get_cart_items)
cartRouter.post('/cart/:id', cartController.add_cart_item)
cartRouter.delete('/cart/:userId/:itemId', cartController.delete_item)