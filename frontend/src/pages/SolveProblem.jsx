// import { useState } from "react";
// import CodeEditor from "../components/CodeEditor";
// import api from "../services/api";

// const SolveProblem = ({ problemId }) => {
//     const [language, setLanguage] = useState("python");
//     const [code, setCode] = useState(
//         "a, b = map(int, input().split())\nprint(a + b)"
//     );
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const submitCode = async () => {
//         try {
//             setLoading(true);
//             setMessage("");

//             await api.post(`/problems/${problemId}/submit`, {
//                 language,
//                 code
//             });

//             setMessage("Code submitted successfully!");
//         } catch (error) {
//             setMessage("Submission failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-gray-950 min-h-screen p-6">
//             <h2 className="text-2xl text-white font-bold mb-4">
//                 Solve Problem
//             </h2>

//             {/* Language Selector */}
//             <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="mb-4 bg-gray-900 text-white px-4 py-2 rounded"
//             >
//                 <option value="python">Python</option>
//                 <option value="cpp">C++</option>
//                 <option value="java">Java</option>
//                 <option value="javascript">JavaScript</option>
//             </select>

//             {/* Code Editor */}
//             <CodeEditor
//                 language={language === "cpp" ? "cpp" : language}
//                 code={code}
//                 setCode={setCode}
//             />

//             {/* Submit Button */}
//             <button
//                 onClick={submitCode}
//                 disabled={loading}
//                 className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white font-semibold"
//             >
//                 {loading ? "Submitting..." : "Submit Code"}
//             </button>

//             {/* Message */}
//             {message && (
//                 <p className="mt-3 text-sm text-gray-300">{message}</p>
//             )}
//         </div>
//     );
// };

// export default SolveProblem;


import { useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import api from "../services/api";

const SolveProblem = () => {
    const { problemId } = useParams(); // ✅ FROM URL
    console.log(problemId)

    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState(
        "a, b = map(int, input().split())\nprint(a + b)"
    );
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const submitCode = async () => {
        try {
            setLoading(true);
            setMessage("");

            await api.post(`/problems/${problemId}/submit`, {
                language,
                code
            });

            setMessage("✅ Code submitted successfully!");
        } catch (error) {
            setMessage(`❌ Submission failed ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-950 min-h-screen p-6">
            <h2 className="text-2xl text-white font-bold mb-4">
                Solve Problem
            </h2>

            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mb-4 bg-gray-900 text-white px-4 py-2 rounded"
            >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
            </select>

            <CodeEditor
                language={language === "cpp" ? "cpp" : language}
                code={code}
                setCode={setCode}
            />

            <button
                onClick={submitCode}
                disabled={loading}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white font-semibold"
            >
                {loading ? "Submitting..." : "Submit Code"}
            </button>

            {message && (
                <p className="mt-3 text-sm text-gray-300">{message}</p>
            )}
        </div>
    );
};

export default SolveProblem;
