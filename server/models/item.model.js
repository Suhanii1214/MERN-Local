import mongoose from 'mongoose'

export const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw1zqu6XHrsdahkWcl4_dUii&ust=1703607686230000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCu26v_qoMDFQAAAAAdAAAAABAD"
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount_price: {
        type: Number,
    },
    date_added: {
        type: Date,
        default: Date.now
    },
})

const ItemModel = mongoose.model("Item", ItemSchema);

export default ItemModel;