function solution(A) {
    let total1Right = A.reduce((v, e) => {
        if (e == 1) {
            v++;
        }
        return v;
    }, 0);
    let totalPairs = 0;
    for (let i = 0; i < A.length; i++) {
        if (A[i] == 0) {
            totalPairs += total1Right;
        } else {
            total1Right--;
        }
    }
    if (totalPairs > 1000000000) {
        return -1;
    }
    return totalPairs;
}
