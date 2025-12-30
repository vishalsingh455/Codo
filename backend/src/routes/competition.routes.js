import express from "express";
import authUserMiddleware from "../middlewares/auth.middleware.js";
import { createCompetition, joinCompetition } from "../controllers/competition.controller.js";

const router = express.Router()

router.post('/create', authUserMiddleware, createCompetition)
router.post('/join', authUserMiddleware, joinCompetition)

export default router