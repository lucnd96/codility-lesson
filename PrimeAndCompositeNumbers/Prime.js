/**
 *
 * @param {number[]} N
 */
function getPrimes(N) {
    const marked = Array(N + 1).fill(true);
    for (let i = 2; i * i <= N; i++) {
        if (marked[i]) {
            for (let j = i * 2; j <= N; j += i) {
                marked[j] = false;
            }
        }
    }
    return marked
        .map((e, i) => (i > 1 && e ? i : null))
        .filter((e) => e !== null);
}
