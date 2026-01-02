import { useState } from "react";
import { createCompetition } from "../../api/competition.api";
import { useNavigate } from "react-router-dom";

const CreateCompetition = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createCompetition({ title });
        navigate(`/competition/${res.data._id}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4">Create Competition</h2>

                <input
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Competition Title"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button className="w-full bg-blue-600 text-white p-2 rounded">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateCompetition;
