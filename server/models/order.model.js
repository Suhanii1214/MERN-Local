import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "user"
    },
    fullName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [{
        productId: {
            type: String,
            ref: "item"
        },
        name: String,
        image: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw1zqu6XHrsdahkWcl4_dUii&ust=1703607686230000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCu26v_qoMDFQAAAAAdAAAAABAD"
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

const OrderModel = mongoose.model("Order", OrderSchema)
export default OrderModel