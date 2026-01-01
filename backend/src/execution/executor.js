// import runPython from "./runPython.js";
// import runCpp from "./runCpp.js";
// import runJava from "./runJava.js";

// const executeCode = async (language, code, input) => {
//     switch (language) {
//         case "python":
//             return await runPython(code, input);
//         case "cpp":
//             return await runCpp(code, input);
//         case "java":
//             return await runJava(code, input);
//         default:
//             throw new Error("Unsupported language");
//     }
// };

// export default executeCode;


import runCodePiston from "./pistonExecutor.js";

const executeCode = async (language, code, input) => {
    return await runCodePiston(language, code, input);
};

export default executeCode;
