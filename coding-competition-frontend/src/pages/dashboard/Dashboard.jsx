import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyCompetitions } from "../../api/competition.api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({ joined: [], organized: [] });

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMyCompetitions();
            setData(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-10">
                <button
                    onClick={() => navigate("/competition/create")}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Create Competition
                </button>

                <button
                    onClick={() => navigate("/competition/join")}
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Join Competition
                </button>
            </div>

            {/* Organized */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Organized Competitions</h2>
                <div className="grid grid-cols-3 gap-4">
                    {data.organized.map((c) => (
                        <div
                            key={c._id}
                            onClick={() => navigate(`/competition/${c._id}`)}
                            className="bg-white p-4 rounded shadow cursor-pointer"
                        >
                            <h3 className="font-bold">{c.title}</h3>
                            <p className="text-gray-500">Code: {c.code}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Joined */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Joined Competitions</h2>
                <div className="grid grid-cols-3 gap-4">
                    {data.joined.map((c) => (
                        <div
                            key={c._id}
                            onClick={() => navigate(`/competition/${c._id}`)}
                            className="bg-white p-4 rounded shadow cursor-pointer"
                        >
                            <h3 className="font-bold">{c.title}</h3>
                            <p className="text-gray-500">Organizer: {c.organizer.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
