//cartController.js
import Cart from '../models/cart.model.js'
import Item from '../models/item.model.js'

export const get_cart_items = async (req, res) => {
    const userId = req.params.id
    console.log(userId);
    try{
        let cart = await Cart.findOne({userId})
        if(cart && cart.items.length>0) {
            res.status(200).json(cart);
        } else {
            res.status(404).json(userId)
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong")
    }
}

export const add_cart_item = async (req,res) => {
    const userId = req.params.id
    const {productId, quantity} = req.body

    try {
        let cart = await Cart.findOne({userId})
        let item = await Item.findOne({_id:productId})
        if(!item) {
            res.status(404).send('Item not found!')
        }
        const price = item.price
        const name = item.title
        const image = item.image

        if(cart) {
            //if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId)

            if(itemIndex > -1) {
                let productItem = cart.items[itemIndex]
                productItem.quantity += quantity
                cart.items[itemIndex] = productItem
            } else {
                cart.items.push({productId, name, quantity, price, image})
            }
            cart.bill += quantity*price
            cart = await cart.save()
            return res.status(201).send(cart)
        } 
        else {
            //no cart exists, creat one
            const newCart = await Cart.create({
                userId,
                items: [{productId, name, quantity, price, image}],
                bill: quantity*price
            })
            return res.status(201).send(newCart)
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong")
    }
}

export const delete_item = async (req, res) => {
    const { userId, itemId } = req.params;
  
    try {
      // Find the order by userId
      const order = await Cart.findOne({ userId });
  
      // Check if the order exists
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Find the index of the item in the items array
      const itemIndex = order.items.findIndex(item => item._id.toString() === itemId);
  
      // Check if the item exists in the order
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in the order' });
      }
  
      // Get the price of the item being removed
      const removedItemPrice = order.items[itemIndex].price * order.items[itemIndex].quantity;
  
      // Remove the item from the items array
      order.items.splice(itemIndex, 1);
  
      // Recalculate the bill by subtracting the removed item's price
      order.bill -= removedItemPrice;
  
      // Update the order in the database
      await order.save();
  
      // Return the updated order
      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

const cartController = {get_cart_items, add_cart_item, delete_item}
export default cartController