import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            navigate("/dashboard");
        } catch {
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <input
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="w-full bg-green-600 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
