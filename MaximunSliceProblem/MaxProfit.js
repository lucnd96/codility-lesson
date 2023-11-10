/**
 *
 * @param {number[]} A
 */
function solution(A) {
    if (A.length < 2) {
        return 0;
    }
    let maxProfit = A[1] - A[0];
    let minValue = A[0];
    for (let i = 1; i < A.length; i++) {
        if (A[i] < minValue) {
            minValue = A[i];
        }
        const currentMaxProfit = A[i] - minValue;
        if (currentMaxProfit > maxProfit) {
            maxProfit = currentMaxProfit;
        }
    }
    return maxProfit > 0 ? maxProfit : 0;
}
