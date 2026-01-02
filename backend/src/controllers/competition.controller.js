import { Competition } from "../models/Competition.model.js";
import { User } from "../models/User.model.js";
import generateRoomCode from "../utils/generateRoomCode.js";

const createCompetition = async (req, res) => {
    try {
        const { title, description, startTime, endTime } = req.body;
        const userId = req.user.id;
         if(!title || !description) {
            return res
            .status(400)
            .json({
                success:false,
                message:"title and description are required"
            })
         }

        // Generate unique room code
        let roomCode;
        let exists = true;

        while (exists) {
            roomCode = generateRoomCode();
            exists = await Competition.findOne({ roomCode });
        }

        const competition = await Competition.create({
            title, 
            description,
            organizer:userId,
            roomCode,
            startTime,
            endTime
        })

        // add competition to user's organized list

        await User.findByIdAndUpdate(userId, {
            $push: { organizedCompetitions: competition._id } 
        })

        return res.status(201).json({
            success: true,
            message: "Competition created successfully",
            competition
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while creating competition"
        });
    }
}

const joinCompetition = async (req, res) => {
    try {
        const {roomCode} = req.body
        const userId = req.user.id
    
        if(!roomCode) {
            return res
            .status(400)
            .json({
                success:false,
                message:"Room Code is required"
            })
        }
    
        // find competition by room code
    
        const competition = await Competition.findOne({roomCode})
    
        if(!competition) {
            return res.status(404).json({
                success: false,
                message: "Room does not found"
            });
        }
    
        // check if user already joined
        if(competition.registeredUsers.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "User already joined this competition"
            });
        }
    
        // add user to competition
        competition.registeredUsers.push(userId)
        await competition.save()
    
        // add competition to user
        await User.findByIdAndUpdate(userId, {
            $push: { registeredCompetitions: competition._id }
        })
    
        return res
        .status(200)
        .json({
            success: true,
            message: "Successfully joined the competition",
            competitionId: competition._id
        });
    } catch (error) {
        console.error(error);
        return res
        .status(500)
        .json({
            success: false,
            message: "Server error while joining competition"
        });
    }
}

const getAllCompetitions = async (req, res) => {
    try {
        const competitions = await Competition.find({})
            .select("title description roomCode startTime endTime");

        return res
        .status(200)
        .json({
            success:true,
            message:"all competitions fetched successfully",
            competitions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while fetching competitions"
        });
    }

}

const getMyCompetitions = async (req, res) => {
    try {
        const userId = req.user.id;

        const competitions = await Competition.find({
            organizer: userId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            competitions
        });
    } catch (error) {
        return res
        .status(500)
        .json({
            success:false,
            message:"Server error while fetching your competitions"
        })
    }
}

export {createCompetition, joinCompetition, getAllCompetitions, getMyCompetitions}