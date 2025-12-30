import express from 'express'
import authUserMiddleware from '../middlewares/auth.middleware.js'
import { getUserDashboard } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/dashboard', authUserMiddleware, getUserDashboard)

export default router