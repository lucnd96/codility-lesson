function solution(N) {
    //A*B = N
    const s = Math.sqrt(N);
    if (s % 1 === 0) {
        return 4 * s;
    }
    for (let i = Math.floor(s); i > 0; i--) {
        if (N % i === 0) {
            return (i + N / i) * 2;
        }
    }
}
