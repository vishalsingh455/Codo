import { useState } from "react";
import api from "../services/api";

const JoinCompetition = () => {
    const [roomCode, setRoomCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const joinCompetition = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (roomCode.length !== 6) {
            setError("Competition code must be 6 digits");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/competitions/join", {
                roomCode
            });

            setSuccess(res.data.message);
            console.log(res.data)

        } catch (err) {
            // ✅ MOST IMPORTANT PART
            const serverMessage =
                err.response?.data?.message || "Server not reachable";

            setError(serverMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <form
                onSubmit={joinCompetition}
                className="bg-gray-900 p-8 rounded-xl w-96 shadow-xl"
            >
                <h2 className="text-2xl text-white font-bold mb-6 text-center">
                    Join Competition
                </h2>

                <input
                    type="text"
                    maxLength="6"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none mb-4 text-center tracking-widest"
                />

                {error && (
                    <p className="text-red-400 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="text-green-400 text-sm mb-3 text-center">
                        {success}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white font-semibold"
                >
                    {loading ? "Joining..." : "Join"}
                </button>
            </form>
        </div>
    );
};

export default JoinCompetition;
