const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-400">
                CodeArena
            </h1>

            <div className="space-x-6 text-sm">
                <a className="hover:text-indigo-400">Competitions</a>
                <a className="hover:text-indigo-400">Dashboard</a>
                <a className="hover:text-red-400">Logout</a>
            </div>
        </nav>
    );
};

export default Navbar;
