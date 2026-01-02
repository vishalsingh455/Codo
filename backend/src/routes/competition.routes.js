import express from "express";
import authUserMiddleware from "../middlewares/auth.middleware.js";
import { createCompetition, joinCompetition, getMyCompetitions } from "../controllers/competition.controller.js";
import { getCompetitionSubmissions } from "../controllers/competitionSubmissions.controller.js";

const router = express.Router()

router.post('/create', authUserMiddleware, createCompetition)
router.post('/join', authUserMiddleware, joinCompetition)

router.get(
    "/:competitionId/submissions",
    authUserMiddleware,
    getCompetitionSubmissions
);

router.get('/my-competitions', authUserMiddleware, getMyCompetitions)


export default router