import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "user"
    },
    items: [{
        productId: {
            type: String,
            ref: "item"
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number,
        image: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw1zqu6XHrsdahkWcl4_dUii&ust=1703607686230000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCu26v_qoMDFQAAAAAdAAAAABAD"
        },
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

const CartModel = mongoose.model("Cart", CartSchema)
export default CartModel