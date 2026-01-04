import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import api from '../services/api';

const Navbar = () => {
    const authContext = useAuth();
    const user = authContext?.user;
    const loading = authContext?.loading;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            navigate('/');
            window.location.reload();
        } catch {
            console.error('Logout failed');
        }
    };

    if (loading) {
        return (
            <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-indigo-400">
                    Codo
                </div>
                <div className="text-gray-400">Loading...</div>
            </nav>
        );
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-400">
                Codo
            </Link>

            {user ? (
                <div className="space-x-6 text-sm">
                    <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
                        Dashboard
                    </Link>
                    <Link to="/organizer" className="hover:text-indigo-400 transition-colors">
                        Organizer
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="hover:text-red-400 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="space-x-6 text-sm">
                    <Link to="/" className="hover:text-indigo-400 transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="hover:text-indigo-400 transition-colors">
                        Register
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
