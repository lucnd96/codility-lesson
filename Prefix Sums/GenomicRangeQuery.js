const IMPACT_MAP = {
    A: 1,
    C: 2,
    G: 3,
    T: 4,
};

function getMinimalImpactInRange(S, start, end) {
    let min = IMPACT_MAP[S[start]];
    for (let i = start; i <= end; i++) {
        if (IMPACT_MAP[S[i]] < min) {
            min = IMPACT_MAP[S[i]];
        }
    }
    return min;
}

function getMinimalImpactInRangeByVector(S_normalized, start, end) {
    let min = null;

    for (let i = 0; i < S_normalized.length; i++) {
        const vector = S_normalized[i];
        if (start <= vector.end && vector.start <= end) {
            if (min === null || min > vector.value) {
                min = vector.value;
            }
        }
        if (vector.start > end) {
            break;
        }
    }
    return min;
}

function getMinimalImpactInRangeWithMemories(
    S_normalized,
    memories,
    start,
    end,
) {
    const startArr = memories[start];
    let min;
    function findBestMemory(startArr, end) {
        let bestMemory = startArr[0];
        for (let i = 0; i < startArr.length; i++) {
            const diff = end - startArr[i].end;
            const bestDiff = end - bestMemory.end;
            if (diff > 0 && diff < bestDiff) {
                bestMemory = startArr[i];
            }
        }
        if (end - bestMemory.end < 0) {
            return null;
        }
        return bestMemory;
    }

    if (startArr) {
        for (let i = 0; i < startArr.length; i++) {
            if (startArr[i].end === end) {
                return startArr[i].value;
            }
        }
        const bestMemory = findBestMemory(startArr, end);
        if (bestMemory) {
            min = Math.min(
                bestMemory.value,
                getMinimalImpactInRangeByVector(
                    S_normalized,
                    bestMemory.end,
                    end,
                ),
            );
        }
    }
    if (!min) {
        min = getMinimalImpactInRangeByVector(S_normalized, start, end);
    }
    const newMemory = { start, end, value: min };
    if (startArr) {
        memories[start].push(newMemory);
    } else {
        memories[start] = [newMemory];
    }
    return min;
}

function normalizeSequence(S) {
    let result = [];
    let tmp = {
        start: 0,
        end: 0,
        value: IMPACT_MAP[S[0]],
    };
    for (let i = 1; i < S.length; i++) {
        if (IMPACT_MAP[S[i]] !== tmp.value) {
            result.push(tmp);
            tmp = {
                start: i,
                end: i,
                value: IMPACT_MAP[S[i]],
            };
        } else {
            tmp.end++;
        }
        if (i === S.length - 1) {
            result.push(tmp);
        }
    }
    return result.length ? result : [tmp];
}

/**
 *
 * @param {string} S
 * @param {number[]} P
 * @param {number[]} Q
 */
function solution(S, P, Q) {
    const result = Array(P.length).fill(null);
    const S_normalized = normalizeSequence(S);
    const memories = {};
    console.log({ S_normalized });
    for (let k = 0; k < P.length; k++) {
        result[k] = getMinimalImpactInRangeWithMemories(
            S_normalized,
            memories,
            P[k],
            Q[k],
        );
    }

    return result;
}

function finalSolution(S, P, Q) {
    let occursRef = [];
    for (let i = 0; i < S.length; i++) {
        if (S[i] === "A") {
            occursRef.push([1, 0, 0, 0]);
        }
        if (S[i] === "C") {
            occursRef.push([0, 1, 0, 0]);
        }
        if (S[i] === "G") {
            occursRef.push([0, 0, 1, 0]);
        }
        if (S[i] === "T") {
            occursRef.push([0, 0, 0, 1]);
        }
    }
    for (let i = 1; i < occursRef.length; i++) {
        for (let k = 0; k < 4; k++) {
            occursRef[i][k] += occursRef[i - 1][k];
        }
    }
    let result = [];
    for (let i = 0; i < P.length; i++) {
        if (P[i] === Q[i]) {
            result.push(IMPACT_MAP[S[P[i]]]);
            continue;
        }
        for (let j = 0; j < 4; j++) {
            if (
                occursRef[Q[i]][j] - occursRef[P[i]][j] > 0 ||
                IMPACT_MAP[S[P[i]]] === j + 1
            ) {
                result.push(j + 1);
                break;
            }
        }
    }
    return result;
}
