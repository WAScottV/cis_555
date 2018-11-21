const m = require('./problem_6-1');

const bruteForcePdp = (L, n) => {
    const results = [];
    const M = Math.max(...L);
    for (let i = 0; i < L.length - n; i++) {

        const sequences = getSequencesForStartPoint(L, i, n - 2);
        if (sequences.length === 0) break;
        sequences.forEach(s => {
            const X = [0];
            X.push(...s);
            X.push(M);
            const deltaX = m.multiset(X);
            if (deltaX.toString() === L.toString()) {
                results.push(X);
            }
        });
    }
    return results;
}



const getSequencesForStartPoint = (arr, start, count) => {
    if (count === 1) return arr.map(v => [v]);
    const unique = [...new Set(arr.filter(v => v > 0))];
    const results = [];
    for (let toStart = 1; toStart < count; toStart++) {
        for (let i = 0; i <= unique.length - count; i++) {
            const tempArr = JSON.parse(JSON.stringify(unique));
            const thisArr = [];
            thisArr.push(...tempArr.splice(start, toStart));
            thisArr.push(...tempArr.splice(i, count - toStart));
            results.push(thisArr);
        }
    }
    return results;
};

// const testData = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 9, 9, 10, 11, 12, 15];
// console.log(bruteForcePdp(testData, 7));

const testData = [1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 7, 7, 7, 8, 9, 10, 11, 12];
console.log(bruteForcePdp(testData, 7));