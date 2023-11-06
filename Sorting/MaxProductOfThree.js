// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  let max1 = 1000,
    max2 = 1000,
    max3 = 1000,
    min1 = 1000,
    min2 = 1000;
  for (let i = 0; i < A.length; i++) {
    const currentElement = A[i];
    if (currentElement > max1) {
      max3 = max2;
      max2 = max1;
      max1 = currentElement;
    } else if (currentElement > max2) {
      max3 = max2;
      max2 = currentElement;
    } else if (currentElement > max3) {
      max3 = currentElement;
    }
    if (currentElement < min1) {
      min2 = min1;
      min1 = currentElement;
    } else if (currentElement < min2) {
      min2 = currentElement;
    }
  }
  return Math.max(min1 * min2 * max1, max1 * max2 * max3, max1 * max2 * min1);
}
