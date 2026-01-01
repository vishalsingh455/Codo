import { Submission } from "../models/Submission.model.js";
import { User } from "../models/User.model.js";

const getLeaderboard = async (req, res) => {
    try {
        const { competitionId } = req.params;

        // 1 Fetch all accepted submissions of this competition
        const submissions = await Submission.find({
            competition: competitionId,
            status: "accepted"
        }).populate("user", "name");

        // 2️ Aggregate score per user
        const leaderboardMap = {};

        submissions.forEach(sub => {
            const userId = sub.user._id.toString();

            if (!leaderboardMap[userId]) {
                leaderboardMap[userId] = {
                    userId,
                    name: sub.user.name,
                    totalScore: 0,
                    earliestSubmission: sub.createdAt
                };
            }

            leaderboardMap[userId].totalScore += sub.score;

            // Track earliest submission time
            if (sub.createdAt < leaderboardMap[userId].earliestSubmission) {
                leaderboardMap[userId].earliestSubmission = sub.createdAt;
            }
        });

        // 3️ Convert map to array
        const leaderboard = Object.values(leaderboardMap);

        // 4️ Sort leaderboard
        leaderboard.sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }
            return a.earliestSubmission - b.earliestSubmission;
        });

        return res.status(200).json({
            success: true,
            leaderboard
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching leaderboard"
        });
    }
};

export { getLeaderboard };
