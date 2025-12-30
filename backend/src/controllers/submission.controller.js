import { Submission } from "../models/Submission.model.js";
import { Problem } from "../models/Problem.model.js";
import { Competition } from "../models/Competition.model.js";

const submitCode = async (req, res) => {
    try {
        const {problemId} = req.params
        const userId = req.user.id
        const {code, language} = req.body
    
        if (!code || !language) {
            return res.status(400).json({
                success: false,
                message: "Code and language are required"
            });
        }
    
        //find problem
        const problem = await Problem.findById(problemId)
    
        if(!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }
    
        // find competition
        const competition = await Competition.findById(problem.competition)
        
        // check if user joined a competition or not
        if (!competition.registeredUsers.includes(userId)) {
            return res
            .status(403)
            .json({
                success: false,
                message: "You must join the competition before submitting"
            });
        }
    
        // create submission
    
        const submission = await Submission.create({
            user:userId,
            problem:problemId,
            competition:competition._id,
            code, 
            language,
            status:"pending"
        })
    
        return res
        .status(201)
        .json({
            success: true,
            message: "Code submitted successfully",
            submissionId: submission._id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while submitting code"
        });
    }
}

export {submitCode}