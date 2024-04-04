import mongoose from "mongoose"

export const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/test`)
        console.log("MongoDB Connection Successful!", connectionInstance.connection.host);
    } catch (error) {
        console.log("MongoDB Connection Failed!", error);
        process.exit(1)
    }
}