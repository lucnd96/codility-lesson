// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
/**
 *
 * @param {number[]} A
 * @param {number[]} B
 */
function solution(A, B) {
    const stack = [0];
    for (let i = 1; i < A.length; i++) {
        let currentFish = i;
        let lastFish = stack[stack.length - 1];
        console.log({ stack, currentFish, lastFish });
        if (B[lastFish] === 0 || B[currentFish] === 1) {
            stack.push(i);
        } else {
            while (B[lastFish] === 1 && stack.length > 0) {
                console.log({ stack, lastFish });
                if (A[currentFish] > A[lastFish]) {
                    lastFish = stack.pop();
                } else {
                    stack.push(lastFish);
                    break;
                }
            }
            lastFish = stack[stack.length - 1];
            if (B[lastFish] === 0 || stack.length === 0) {
                // stack.push(currentFish)
                // lastFish = currentFish
            }
        }
    }
    console.log(stack);
    return stack.length;
}

console.log(solution([4, 3, 2, 1, 5], [0, 1, 0, 0, 0]));
// console.log(solution([10, 3, 2, 1, 5], [1, 1, 0, 0, 0]));
