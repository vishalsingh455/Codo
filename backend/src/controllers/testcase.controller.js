import { TestCase } from "../models/TestCase.model.js";
import { Problem } from "../models/Problem.model.js";
import { Competition } from "../models/Competition.model.js";

const addTestCase = async (req, res) => {
    try {
        const {problemId} = req.params
        const userId = req.user.id
    
        const {input, expectedOutput, isHidden} = req.body
    
        if (!input || !expectedOutput) {
            return res.status(400).json({
                success: false,
                message: "Input and expected output are required"
            });
        }
    
        // find problem
        const problem = await Problem.findById(problemId)
    
        if(!problem) {
            return res
            .status(404)
            .json({
                success: false,
                message: "Problem not found"
            });
        }
    
        // find competition
        const competition = await Competition.findById(problem.competition);
    
        // ownership check
        if(competition.organizer.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Only the organizer can add test cases"
            });
        }
    
        // add test case
        const testCase = await TestCase.create({
            input, 
            expectedOutput, 
            isHidden: isHidden || false,
            problem:problemId
        })
    
        return res
        .status(201)
        .json({
            success: true,
            message: "Test case added successfully",
            testCase
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while adding test case"
        });
    }
}

export {addTestCase}