import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("DB connected")
        })
        .catch(() => {
            console.log("DB not connected")
        })
}

export default connectDB