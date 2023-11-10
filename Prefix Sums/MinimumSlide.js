// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

/**
 *
 * @param {number[]} sumArr
 */
function findMinSliceAverage(A, sumArr) {
    let minSliceAverage = Number.MAX_SAFE_INTEGER;
    const elementAverage = sumArr[sumArr.length - 1] / sumArr.length;
    let result = 0;
    let lastJ = 0;
    for (let i = 0; i < sumArr.length; i++) {
        if (i < lastJ) {
            i = lastJ;
            break;
        }
        for (let j = i + 1; j < sumArr.length; j++) {
            const sliceAverage = (sumArr[j] - sumArr[i] + A[i]) / (j - i + 1);
            if (
                sliceAverage < minSliceAverage &&
                sliceAverage < elementAverage
            ) {
                minSliceAverage = sliceAverage;
                console.log({ i, j, sliceAverage });
                result = i;
                lastJ = j;
            }
        }
    }
    return result;
}

/**
 *
 * @param {number[]} A
 */
function findMinSliceAverageV2(A) {
    const average = A.reduce((p, c) => p + c, 0) / arr.length;
    for (let i = 0; i < A.length; i++) {}
}

/**
 *
 * @param {number[]} A
 */
function solution(A) {
    // Implement your solution here
    let currentSum = 0;
    const sumArr = [];
    for (let i = 0; i < A.length; i++) {
        currentSum += A[i];
        sumArr.push(currentSum);
    }
    return findMinSliceAverage(A, sumArr);
}

function finalSolution(A) {
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = 0;
    for (let i = 0; i < A.length - 1; i++) {
        const sumTwo = A[i] + A[i + 1];
        if (sumTwo / 2 < min) {
            min = sumTwo / 2;
            minIndex = i;
        }
        if (i < A.length - 1) {
            const sumThree = sumTwo + A[i + 2];
            if (sumThree / 3 < min) {
                min = sumThree / 3;
                minIndex = i;
            }
        }
    }
    return minIndex;
}
