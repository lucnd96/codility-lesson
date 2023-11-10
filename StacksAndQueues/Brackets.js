function solution(S) {
    // Implement your solution here
    const map = {
        "(": ")",
        "[": "]",
        "{": "}",
    };
    const stack = [];
    for (let i = 0; i < S.length; i++) {
        if (["(", "[", "{"].includes(S[i])) {
            stack.push(S[i]);
        } else {
            if (stack.length === 0) {
                return 0;
            }
            const last = stack[stack.length - 1];
            if (S[i] !== map[last]) {
                return 0;
            } else {
                stack.pop();
            }
        }
    }
    return stack.length === 0 ? 1 : 0;
}
