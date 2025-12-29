import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import testRoutes from './routes/test.routes.js'
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// routes

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/api/auth', authRoutes)
app.use("/api/test", testRoutes);


export default app