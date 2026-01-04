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
import problemRoutes from './routes/problem.routes.js'
import testCaseRoutes from './routes/testCase.routes.js'
import submissionRoutes from './routes/submission.routes.js'
import leaderboardRoutes from './routes/leaderboard.routes.js'
import resultRoutes from './routes/result.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
dotenv.config()
const app = express()

//middlewares
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

// routes

//app.get('/', authUserMiddleware, getAllCompetitions)

app.use('/api/auth', authRoutes)
app.use("/api/test", testRoutes);

app.use('/api/competitions', competitionRoutes)

app.use('/api/user', userRoutes)

app.use('/api', problemRoutes)

app.use('/api', testCaseRoutes)

app.use('/api', submissionRoutes)

app.use('/api', leaderboardRoutes)

app.use("/api", resultRoutes)

app.use("/api", analyticsRoutes)
export default app