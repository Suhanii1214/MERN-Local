import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    contact: {
        type: Number
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length must be 6 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;