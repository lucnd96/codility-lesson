function solution(N) {
    var i;
    var numFactors = 0;

    for (i = 1; i * i < N; i++) {
        if (N % i == 0) numFactors += 2;
    }

    if (i * i == N) numFactors++;

    return numFactors;
}
