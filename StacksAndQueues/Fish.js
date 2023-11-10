/**
 *
 * @param {number[]} A
 * @param {number[]} B
 */
function solution(A, B) {
    const stack = [];
    let lastFish = stack[stack.length - 1];
    for (let i = 0; i < A.length; i++) {
        if (B[lastFish] === 0 || B[i] === 1 || stack.length === 0) {
            stack.push(i);
        } else {
            while (B[lastFish] === 1 && stack.length > 0) {
                if (A[i] > A[lastFish]) {
                    stack.pop();
                    lastFish = stack[stack.length - 1];
                } else {
                    break;
                }
            }
            if (B[lastFish] === 0 || stack.length === 0) {
                stack.push(i);
            }
        }
        lastFish = stack[stack.length - 1];
    }
    return stack.length;
}
