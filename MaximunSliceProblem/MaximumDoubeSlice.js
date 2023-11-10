/**
 *
 * @param {number[]} A
 */
function solution(A) {
    let left = {};
    let right = {};
    let sumLeft = 0;
    let sumRight = 0;

    for (let i = 1; i < A.length - 1; i++) {
        const k = A.length - 1 - i;
        right[k] = sumRight;
        sumRight += A[k];
        if (sumRight < 0) {
            sumRight = 0;
        }

        left[i] = sumLeft;
        sumLeft += A[i];
        if (sumLeft < 0) {
            sumLeft = 0;
        }
    }
    let max = 0;
    for (let i = 1; i < A.length - 1; i++) {
        const tmp = left[i] + right[i];
        if (tmp > max) {
            max = tmp;
        }
    }
    return max;
}
