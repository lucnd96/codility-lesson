/**
 *
 * @param {number[]} H
 */
function solution(H) {
    const stack = [];
    let requireBlocks = 0;
    for (let i = 0; i < H.length; i++) {
        while (stack.length > 0 && H[i] < H[stack[stack.length - 1]]) {
            stack.pop();
        }
        if (stack.length === 0 || H[i] > H[stack[stack.length - 1]]) {
            stack.push(i);
            requireBlocks++;
        }
    }
    return requireBlocks;
}
