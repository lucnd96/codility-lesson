/**
 *
 * @param {number[]} A
 */
function solution(A) {
    const left = {};
    const right = {};
    for (let i = 0; i < A.length; i++) {
        const key = A[i];
        left[key] = 0;
        if (!right[key]) {
            right[key] = 1;
        } else {
            right[key]++;
        }
    }
    let maxLeft = A[0];
    const result = [];
    for (let i = 0; i < A.length; i++) {
        const key = A[i];
        left[key]++;
        right[key]--;
        if (left[key] > left[maxLeft]) {
            maxLeft = key;
        }
        if (
            left[maxLeft] > (i + 1) / 2 &&
            right[maxLeft] > (A.length - i - 1) / 2
        ) {
            result.push(i);
        }
    }
    return result.length;
}
