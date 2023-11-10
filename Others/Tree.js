/**
 *
 * @param {number[]} X
 * @param {number[]} Y
 */
function solution(X, Y) {
    let max = 0;
    let sortedX = X.sort((a, b) => a - b);
    for (let i = 0; i < sortedX.length - 1; i++) {
        const tmp = sortedX[i + 1] - sortedX[i];
        if (tmp > max) {
            max = tmp;
        }
    }
    return max;
}

