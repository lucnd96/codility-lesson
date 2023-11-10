/**
 *
 * @param {number[]} A
 */
function solution(A) {
    const map = {};
    const threshold = A.length / 2;
    for (let i = 0; i < A.length; i++) {
        const key = A[i];
        if (!map[key]) {
            map[key] = 1;
        } else {
            map[key]++;
        }
        if (map[key] > threshold) {
            return i;
        }
    }
    return -1;
}
