import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateCompetition from "../pages/competition/CreateCompetition";
import JoinCompetition from "../pages/competition/JoinCompetition";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }
        />

        <Route
            path="/competition/create"
            element={
                <ProtectedRoute>
                    <CreateCompetition />
                </ProtectedRoute>
            }
        />

        <Route
            path="/competition/join"
            element={
                <ProtectedRoute>
                    <JoinCompetition />
                </ProtectedRoute>
            }
        />
    </Routes>
);

export default AppRoutes;
