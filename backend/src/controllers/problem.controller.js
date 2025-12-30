import { Problem } from "../models/Problem.model.js";
import { Competition } from "../models/Competition.model.js";

const addProblem = async (req, res) => {
    try {
        const {competitionId} = req.params

        const {
            title,
            statement,
            inputFormat,
            outputFormat,
            constraints,
            difficulty
        } = req.body;

        const userId = req.user.id

        // Validate required fields
        if (
            !title ||
            !statement ||
            !inputFormat ||
            !outputFormat ||
            !difficulty
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // find competition
        const competition = await Competition.findById(competitionId)
        if (!competition) {
            return res
            .status(404)
            .json({
                success: false,
                message: "Competition not found"
            });
        }

        // owenership check
        if(competition.organizer.toString() !== userId) {
            return res
            .status(403)
            .json({
                success:true,
                message:"Only organizers can add problem"
            })
        }

        // decide marks based on the difficulty
        let marksPerTestCase;
        if(difficulty === 'easy') marksPerTestCase = 5
        else if(difficulty === 'medium') marksPerTestCase = 10
        else if(difficulty === 'hard') marksPerTestCase = 15

        // Create Problem
        const problem = await Problem.create({
            title,
            statement,
            inputFormat,
            outputFormat,
            constraints,
            difficulty,
            marksPerTestCase,
            competition: competitionId
        })

        return res
        .status(201)
        .json({
            success:true,
            message:"Problem added successfully",
            problem
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while adding problem"
        });
    }
}

export {addProblem}