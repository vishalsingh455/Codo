import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const OrganizerDashboard = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyCompetitions = async () => {
            try {
                const res = await api.get(
                    "/competitions/my-competitions"
                );

                setCompetitions(res.data.competitions);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to fetch competitions"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyCompetitions();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl text-white font-bold">
                    Organizer Dashboard
                </h2>

                <Link
                    to="/organizer/create"
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
                >
                    + Create Competition
                </Link>
            </div>

            {error && (
                <p className="text-red-400 mb-4">{error}</p>
            )}

            {competitions.length === 0 ? (
                <p className="text-gray-400">
                    You have not created any competitions yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {competitions.map((comp) => (
                        <div
                            key={comp._id}
                            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                        >
                            <h3 className="text-xl text-indigo-400 font-semibold">
                                {comp.title}
                            </h3>

                            <p className="text-gray-400 text-sm mt-2">
                                {comp.description}
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                Room Code:{" "}
                                <span className="tracking-widest text-white">
                                    {comp.roomCode}
                                </span>
                            </p>

                            <div className="flex gap-4 mt-4 text-sm">
                                <Link
                                    to={`/organizer/competitions/${comp._id}/add-problem`}
                                    className="text-green-400 hover:underline"
                                >
                                    Add Problems
                                </Link>

                                <Link
                                    to={`/competitions/${comp._id}/analytics`}
                                    className="text-blue-400 hover:underline"
                                >
                                    Analytics
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrganizerDashboard;
