function solution(A, B, K) {
    let start = -1;
    mod = A % K;
    if (mod === 0) {
        start = A;
    } else {
        start = A + (1 - mod / K) * K;
    }
    if (start === -1 || start > B) {
        return 0;
    }
    return Math.floor((B - start) / K) + 1;
}
