import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const CompetitionDetails = () => {
    const { competitionId } = useParams();
    const [competition, setCompetition] = useState(null);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompetitionDetails();
        fetchProblems();
    }, [competitionId]);

    const fetchCompetitionDetails = async () => {
        try {
            const res = await api.get(`/competitions/${competitionId}`);
            setCompetition(res.data.competition);
        } catch (err) {
            setError("Failed to load competition details");
        }
    };

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/competitions/${competitionId}/problems`);
            setProblems(res.data.problems || []);
        } catch (err) {
            setError("Failed to load problems");
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "text-green-400 bg-green-400/10 border-green-400/30";
            case "medium":
                return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
            case "hard":
                return "text-red-400 bg-red-400/10 border-red-400/30";
            default:
                return "text-gray-400 bg-gray-400/10 border-gray-400/30";
        }
    };

    const formatDate = (date) => {
        if (!date) return "Not set";
        return new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
            {/* Header */}
            <div className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 hover:bg-gray-800 rounded-lg transition"
                            >
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold text-white">
                                {competition?.title || "Competition"}
                            </h1>
                        </div>

                        <Link
                            to={`/leaderboard/${competitionId}`}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                        >
                            View Leaderboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Competition Info */}
                {competition && (
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-3">
                            About Competition
                        </h2>
                        <p className="text-gray-400 mb-4">
                            {competition.description || "No description available"}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Start: {formatDate(competition.startTime)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>End: {formatDate(competition.endTime)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Problems Section */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Problems ({problems.length})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-indigo-600"></div>
                            <p className="text-gray-400 mt-4">Loading problems...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : problems.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-400">
                                No problems added yet
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {problems.map((problem, index) => (
                                <Link
                                    key={problem._id}
                                    to={`/problems/${problem._id}`}
                                    className="block bg-gray-800/50 border border-gray-700 hover:border-indigo-600 rounded-xl p-6 transition group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-gray-400 font-mono text-sm">
                                                    #{index + 1}
                                                </span>
                                                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
                                                    {problem.title}
                                                </h3>
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                                                    {problem.difficulty}
                                                </span>
                                            </div>

                                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                {problem.statement}
                                            </p>

                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{problem.marksPerTestCase} pts/test</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-4">
                                            <div className="p-3 bg-indigo-600/20 group-hover:bg-indigo-600/30 rounded-lg transition">
                                                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompetitionDetails;
