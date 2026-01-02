import { useState } from "react";
import { joinCompetition } from "../../api/competition.api";
import { useNavigate } from "react-router-dom";

const JoinCompetition = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleJoin = async (e) => {
        e.preventDefault();
        const res = await joinCompetition(code);
        navigate(`/competition/${res.data._id}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleJoin}
                className="bg-white p-8 rounded shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4">Join Competition</h2>

                <input
                    className="w-full p-2 border rounded mb-4 text-center tracking-widest"
                    placeholder="Enter 6-digit Code"
                    maxLength={6}
                    onChange={(e) => setCode(e.target.value)}
                />

                <button className="w-full bg-green-600 text-white p-2 rounded">
                    Join
                </button>
            </form>
        </div>
    );
};

export default JoinCompetition;
