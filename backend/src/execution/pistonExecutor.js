import axios from "axios";
import { pistonLanguageMap } from "../utils/pistonLanguages.js";

const runCodePiston = async (language, code, input) => {
    try {
        const pistonLang = pistonLanguageMap[language];

        if (!pistonLang) {
            throw new Error("Unsupported language");
        }

        const response = await axios.post(
            "https://emkc.org/api/v2/piston/execute",
            {
                language: pistonLang,
                version: "*",
                files: [
                    {
                        name: "main",
                        content: code
                    }
                ],
                stdin: input+"\n"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        //return response.data.output ? response.data.output.trim() : "";
        return response.data.run?.stdout?.trim() || "aaa";

    } catch (error) {
        console.error("Piston error:", error.message || error);
        return ""; // treat as failed
    }
};

export default runCodePiston;
