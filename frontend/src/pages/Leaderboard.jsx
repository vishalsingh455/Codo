const Leaderboard = () => {
    return (
        <div className="bg-gray-950 min-h-screen p-8">
            <h2 className="text-3xl text-white font-bold mb-6">
                Leaderboard
            </h2>

            <table className="w-full bg-gray-900 rounded-xl">
                <thead>
                    <tr className="text-gray-400 text-sm">
                        <th className="p-4">Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-white text-center border-t border-gray-800">
                        <td className="p-4">1</td>
                        <td>Vishal</td>
                        <td>120</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
