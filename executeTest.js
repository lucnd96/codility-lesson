import chalk from "chalk";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { fork } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EXECUTION_TIME_OUT = 1 * 1000; //ms

const log = console.log;

const TEST_RESULT = {
    ERROR: "ERROR",
    CORRECT: "CORRECT",
    WRONG: "WRONG",
};

const CHILD_PROCESS_ARG = "child_process_run";

/**
 * @param {number} time
 */
function getExecutionColor(time) {
    if (time < 0.1) {
        return chalk.green;
    }
    if (time < 1) {
        return chalk.yellow;
    }
    return chalk.red;
}

/**
 *
 * @param {{ expected: any, executionTime: number }} param0
 */
function printCorrectAnswer({ executionTime, expected }) {
    log(
        chalk.green.bold("√ CORRECT \n"),
        `expected = ${chalk.green.bold(expected)}`,
        `execution time: ${getExecutionColor(executionTime)(
            executionTime + " ms",
        )}`,
    );
}

/**
 *
 * @param {{ executionTime: number, expected: any, actual: any }} param0
 */
function printWrongAnswer({ executionTime, expected, actual }) {
    log(
        chalk.red.bold("x WRONG ANSWER\n"),
        `Expected: ${chalk.green.bold(expected)}`,
        ` Got: ${chalk.red.bold(actual)}`,
        ` execution time: ${getExecutionColor(executionTime)(
            executionTime + " ms",
        )}`,
    );
}

function printErrorMessage(error) {
    if (error?.message === "TIME_OUT_ERROR") {
        log(
            chalk.red.bold("x TIME_OUT_ERROR\n") +
                `solution run exceeds limit timeout ${EXECUTION_TIME_OUT} ms`,
        );
    } else {
        log(chalk.red.bold("x ERROR\n") + error?.message?.substring(0, 50));
        log(error?.stack);
    }
}

/**
 *
 * @param {Array} testResults
 */
export function printTestResult(testResults) {
    const totalTestCase = testResults.length;
    for (let i = 0; i < totalTestCase; i++) {
        const { result, input, expected, actual, executionTime, error } =
            testResults[i];
        log(
            "------------------------------------------------------------------------------------",
        );
        log("Test with input: ", input);
        if (result === "CORRECT") {
            printCorrectAnswer({ expected, executionTime });
        } else if (result === "WRONG") {
            printWrongAnswer({ executionTime, expected, actual });
        } else {
            printErrorMessage(error);
        }
        log(
            "------------------------------------------------------------------------------------\n",
        );
    }
    log(
        chalk.bold(
            "---------------------------------------SUMMARY--------------------------------------",
        ),
    );
    const passed = testResults.filter((t) => t.result === "CORRECT").length;
    if (passed === totalTestCase) {
        log(chalk.green.bold("100% test cases passed"));
    } else {
        const percentPass = ((100 * passed) / totalTestCase).toFixed(2);
        const percentFail = 100 - percentPass;
        log(
            chalk.red.bold(`FAILED: ${percentFail}%`),
            chalk.green.bold(`PASS: ${percentPass}%`),
        );
    }
}

/**
 *
 * @param {{ testDataIndex, testFile: string }} param1
 */
async function folkSingleTest({ testFile, testDataIndex, testData }) {
    return new Promise(async (resolve) => {
        const controller = new AbortController();
        const child = fork(
            __filename,
            [testFile, CHILD_PROCESS_ARG, testDataIndex],
            { signal: controller.signal },
        );
        child.on("message", (msg) => {
            resolve(msg);
            controller.abort();
        });
        child.on("error", (error) => {
            resolve({
                result: TEST_RESULT.ERROR,
                error,
                ...testData,
            });
            controller.abort();
        });
        setTimeout(() => {
            resolve({
                result: TEST_RESULT.ERROR,
                error: {
                    message: "TIME_OUT_ERROR",
                },
                ...testData,
            });
            controller.abort();
        }, EXECUTION_TIME_OUT);
    });
}

function executeSingleTest(solution, input, expected) {
    const inputArgs = Array.isArray(input) ? input : [input];
    const startTime = performance.now();
    const result = solution(...inputArgs);
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(6);
    if (result === expected) {
        return {
            result: TEST_RESULT.CORRECT,
            input,
            expected,
            executionTime,
        };
    } else {
        return {
            result: TEST_RESULT.WRONG,
            input,
            expected,
            actual: result,
            executionTime,
        };
    }
}

/**
 *
 * @param {Array} data
 * @returns
 */
async function executeAllTest(data, testFile) {
    return Promise.all(
        data.map((testData, i) =>
            folkSingleTest({ testFile, testDataIndex: i, testData }),
        ),
    );
}

(async () => {
    const testFile = process.argv[2]?.trim();
    const testFilePath = join(__dirname, testFile);

    if (!testFile || !fs.existsSync(testFilePath)) {
        log("Test file not found");
        process.exit(1);
    }

    const { solution, data } = await import(`file://${testFilePath}`);

    if (!solution || !data) {
        log("Solution or data not found");
        process.exit(1);
    }

    if (process.argv.includes(CHILD_PROCESS_ARG)) {
        const testDataIndex = process.argv[4];
        const { input, expected } = data[testDataIndex];
        try {
            const result = executeSingleTest(solution, input, expected);
            process.send(result);
        } catch (error) {
            process.send({
                result: TEST_RESULT.ERROR,
                error: {
                    message: error.message,
                    stack: error.stack,
                },
                input,
                expected,
            });
        }
    } else {
        const result = await executeAllTest(data, testFile);
        printTestResult(result);
    }
})();
