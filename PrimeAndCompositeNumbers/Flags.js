/**
 * A non-empty array A consisting of N integers is given.

A peak is an array element which is larger than its neighbours. More precisely, it is an index P such that 0 < P < N − 1 and A[P − 1] < A[P] > A[P + 1].

For example, the following array A:

    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
has exactly four peaks: elements 1, 3, 5 and 10.

You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.



Flags can only be set on peaks. What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K. The distance between indices P and Q is the absolute value |P − Q|.

For example, given the mountain range represented by array A, above, with N = 12, if you take:

two flags, you can set them on peaks 1 and 5;
three flags, you can set them on peaks 1, 5 and 10;
four flags, you can set only three flags, on peaks 1, 5 and 10.
You can therefore set a maximum of three flags in this case.

Write a function:

function solution(A);

that, given a non-empty array A of N integers, returns the maximum number of flags that can be set on the peaks of the array.

For example, the following array A:

    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:
    - N is an integer within the range [1..400,000];
    - each element of array A is an integer within the range [0..1,000,000,000].
 */

/**
 *
 * @param {number[]} A
 */
function solution(A) {
    if (A.length < 3) {
        return 0;
    }
    const flags = [];
    for (let i = 1; i < A.length - 1; i++) {
        if (A[i] > A[i - 1] && A[i] > A[i + 1]) {
            flags.push(i);
            i += 1;
        }
    }
    const lastFlag = flags[flags.length - 1];
    let stack = [];
    const start = Math.min(
        Math.floor(Math.sqrt(lastFlag - flags[0])) + 1,
        flags.length,
    );
    for (let k = start; k > 0; k--) {
        stack = [];
        for (let i = 0; i < flags.length; i++) {
            const missFlags = k - stack.length;
            if (
                missFlags * missFlags > lastFlag - flags[i] + 2 ||
                missFlags > flags.length - i + 1
            ) {
                break;
            }
            if (stack.length === 0 || flags[i] - stack[stack.length - 1] >= k) {
                stack.push(flags[i]);
                if (stack.length >= k) {
                    return k;
                }
            }
        }
    }
    return 0;
}

console.log(solution([1, 3, 1]));