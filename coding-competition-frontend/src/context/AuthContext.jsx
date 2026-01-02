import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getProfile = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/user/dashboard");
            console.log(res.data);
            setUser(res.data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const login = async (data) => {
        await axios.post("http://localhost:3000/api/auth/login", data);
        await getProfile();
    };

    const register = async (data) => {
        await axios.post("http://localhost:3000/api/auth/register", data);
        await getProfile();
    };

    const logout = async () => {
        await axios.post("http://localhost:3000/api/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
