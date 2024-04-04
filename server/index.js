import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import { authRouter } from './routes/auth.route.js'
import { itemRouter } from './routes/item.route.js'
import { orderRouter } from './routes/order.route.js'
import { cartRouter } from './routes/cart.route.js'
import { dbConnect } from './db/database.js'

const app  = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api', authRouter)
app.use('/api', itemRouter)
app.use('/api', orderRouter)
app.use('/api', cartRouter)

// connecting to the database
const port = process.env.PORT

dbConnect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
})
.catch((err) => {
    console.log("Connection Failed! ", err);
})
