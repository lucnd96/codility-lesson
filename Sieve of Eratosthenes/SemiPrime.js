/**
 * represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
The number of semiprimes within each of these ranges is as follows:

(1, 26) is 10,
(4, 10) is 4,
(16, 20) is 0.
Write a function:

function solution(N, P, Q);

that, given an integer N and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
the function should return the values [10, 4, 0], as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..50,000];
M is an integer within the range [1..30,000];
each element of arrays P and Q is an integer within the range [1..N];
P[i] ≤ Q[i].
 */

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

/**
 *
 * @param {number} N
 * @param {number[]} P
 * @param {number[]} Q
 */

function solution(N, P, Q) {
    let primes = getPrimes(N);
    let semiPrimes = [];
    let right = primes.length - 1;
    for (let i = 0; i < right; i++) {
        for (let j = i; j < right; j++) {
            const semiPrime = primes[i] * primes[j];
            if (semiPrime <= N) {
                semiPrimes.push(semiPrime);
            } else {
                right = j;
            }
        }
    }
    semiPrimes = semiPrimes.sort((a, b) => a - b);
    const semiPrimesMap = {};
    const semiPrimeSumMap = {};
    let currentSum = 0;
    for (let i = 0; i < semiPrimes.length; i++) {
        semiPrimesMap[semiPrimes[i]] = true;
    }

    for (let i = 0; i <= N; i++) {
        if (semiPrimesMap[i]) {
            currentSum++;
        }
        semiPrimeSumMap[i] = currentSum;
    }
    let result = [];
    for (let i = 0; i < P.length; i++) {
        let currentCount = semiPrimeSumMap[Q[i]] - semiPrimeSumMap[P[i]];
        if (semiPrimesMap[P[i]]) {
            currentCount++;
        }
        result.push(currentCount);
    }
    return result;
}
