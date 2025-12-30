import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import testRoutes from './routes/test.routes.js'
import cookieParser from "cookie-parser";
import competitionRoutes from './routes/competition.routes.js'
import userRoutes from './routes/user.routes.js'
import authUserMiddleware from "./middlewares/auth.middleware.js";
import { getAllCompetitions } from "./controllers/competition.controller.js";
dotenv.config()
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// routes

app.get('/', authUserMiddleware, getAllCompetitions)

app.use('/api/auth', authRoutes)
app.use("/api/test", testRoutes);

app.use('/api/competitions', competitionRoutes)

app.use('/api/user', userRoutes)


export default app