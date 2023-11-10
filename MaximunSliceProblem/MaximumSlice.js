/**
 *
 * @param {number[]} A
 */
function solution(A) {
    let sumLeft = 0;
    let max = A[0];
    for (let i = 0; i < A.length; i++) {
        sumLeft += A[i];
        if (sumLeft > max) {
            max = sumLeft;
        }
        if (sumLeft < 0) {
            sumLeft = 0;
        }
    }
    return max;
}
