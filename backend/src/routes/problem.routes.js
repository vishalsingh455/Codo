import express from "express";
import { addProblem } from "../controllers/problem.controller.js";
import authUserMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post('/competitions/:competitionId/problems', authUserMiddleware, addProblem)

export default router