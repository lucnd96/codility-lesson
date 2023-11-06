function solution(A) {
  // Implement your solution here
  const sortedArr = A.sort((a, b) => a - b);
  for (let i = 1; i < sortedArr.length - 1; i++) {
    if (sortedArr[i - 1] + sortedArr[i] > sortedArr[i + 1]) {
      return 1;
    }
  }
  return 0;
}
