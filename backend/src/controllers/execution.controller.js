import executeCode from "../execution/executor.js";

const executeSubmission = async (submission, testCases) => {
    let passed = 0;

    for (let testCase of testCases) {
        const output = await executeCode(
            submission.language,
            submission.code,
            testCase.input
        );
        console.log("INPUT:", testCase.input);
        console.log("EXPECTED:", testCase.expectedOutput);
        console.log("OUTPUT:", output);

        if (
            output.trim() === testCase.expectedOutput.trim()
        ) {
            passed++;
        }
    }

    return passed;
};

export { executeSubmission };
