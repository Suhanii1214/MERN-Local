import { Router } from "express";
import itemController from '../controllers/item.controller.js'

export const itemRouter = Router()

itemRouter.get('/items', itemController.get_items)
// itemRouter.get('/item/:id', itemController.get_details)
itemRouter.post('/add-item',itemController.post_item);
itemRouter.put('/items/:id',itemController.update_item);
itemRouter.delete('/items/:id',itemController.delete_item);
