// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  let totalIntersect = 0;
  for (let i = 0; i < A.length - 1; i++) {
    for (let j = i + 1; j < A.length; j++) {
      if (i + A[i] >= j - A[j]) {
        totalIntersect++;
      }
    }
  }
  return totalIntersect;
}

function getUniqueArr(arr) {
  const result = [];
  const map = {};
  for (const e of arr) {
    if (!map[e]) {
      map[e] = true;
      result.push(e);
    }
  }
  return result;
}

function solution(A) {
  const transformedArr = [];
  // Transform to [[L1,R1], [L2, R2], [L3,R3],...]
  for (let i = 0; i < A.length; i++) {
    transformedArr.push([i - A[i], i + A[i]]);
  }
  const leftMap = {};
  const rightMap = {};
  const leftLessThanOrEqualAValue = {};
  const rightLessThanAValue = {};

  for (let i = 0; i < transformedArr.length; i++) {
    const [left, right] = transformedArr[i];
    if (!rightMap[right]) {
      rightMap[right] = 1;
    } else {
      rightMap[right]++;
    }
    if (!leftMap[left]) {
      leftMap[left] = 1;
    } else {
      leftMap[left]++;
    }
  }
  let keysArr = [...Object.keys(leftMap), ...Object.keys(rightMap)];
  keysArr = getUniqueArr(keysArr)
    .map(Number)
    .sort((a, b) => a - b);
  let tmp = 0;
  for (let i = 0; i < keysArr.length; i++) {
    const key = keysArr[i];
    tmp += leftMap[key] ?? 0;
    leftLessThanOrEqualAValue[key] = tmp;
  }
  tmp = 0;
  for (let i = 0; i < keysArr.length; i++) {
    const key = keysArr[i];
    rightLessThanAValue[key] = tmp;
    tmp += rightMap[key] ?? 0;
  }
  let count = 0;
  for (let i = 0; i < transformedArr.length; i++) {
    const [L1, R1] = transformedArr[i];
    if (count / 2 > 10000000) {
      return -1;
    }
    // 2 circles intersect when R2 >= L1 && R1 >= L2
    // (R1 >= L2) - (L1 > R2) - (itself)
    count += leftLessThanOrEqualAValue[R1] - rightLessThanAValue[L1] - 1;
  }
  return Math.floor(count / 2);
}
