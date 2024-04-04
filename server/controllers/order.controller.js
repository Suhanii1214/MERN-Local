import Order from '../models/order.model.js'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import ENV from '../config.js'

export const get_orders = async (req, res) => {
    const userId = req.params.id
    await Order.find({userId}).sort({date:-1}).then(orders => res.json(orders))
}

export const checkout = async (req, res) => {

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })

  try {
    // Create a Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Number(req.body.source.bill * 100), // Razorpay accepts amount in paisa, so multiply by 100
      currency: 'INR', // Update with your currency
    });

    res.status(200).json({
      success: true,
      razorpayOrder
    });
    console.log(razorpayOrder);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }

}

export const paymentVerification = async (req,res) => {
  const {razorpay_payment_id, razorpay_order_id, razorpay_signature, userId, items, shippingInfo, bill} = req.body
    
    try {
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
          // Database comes here

          const newOrder = new Order({
            userId,
            items: items.map(item => ({
              productId: item.productId,
              name: item.name,
              image: item.image,
              quantity: item.quantity,
              price: item.price,
            })),
            fullName: shippingInfo.fullName,
            contact: shippingInfo.contact,
            address: shippingInfo.address,
            bill,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
          })

          await newOrder.save()

          res.send("Payment verification Successful")
        } else {
          // Send a response indicating unsuccessful verification
          res.status(400).send('Payment verification unsuccessful');
        } 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const orderController = { get_orders, checkout, paymentVerification}
export default orderController