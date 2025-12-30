import express from 'express'
import authUserMiddleware from "../middlewares/auth.middleware.js";
import { submitCode } from '../controllers/submission.controller.js';

const router = express.Router()

router.post("/problems/:problemId/submit", authUserMiddleware, submitCode)

export default router