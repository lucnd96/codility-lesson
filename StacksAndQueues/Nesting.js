/**
 *
 * @param {string} S
 */
function solution(S) {
    const stack = [];
    for (let i = 0; i < S.length; i++) {
        if (S[i] === "(") {
            stack.push("(");
        } else if (stack.length === 0 || stack[stack.length - 1] === ")") {
            return 0;
        } else {
            stack.pop();
        }
    }
    return stack.length === 0 ? 1 : 0;
}
