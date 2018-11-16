const m = require('./problem_6-1');

const bruteForcePdp = (L, n) => {
    const results = [];
    const M = Math.max(...L);

    const unique = [...new Set(L.filter(v => v > 0))];
    for (let i = 0; i <= (unique.length - (n - 2)); i++) {
        let X = [0];
        X.push(...JSON.parse(JSON.stringify(unique)).splice(i, n - 2));
        X.push(M);

        const deltaX = m.multiset(X);
        if (deltaX.toString() === L.toString()) {
            results.push(X);
        }
    }
    return results;
}

const testData = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 9, 9, 10, 11, 12, 15];
console.log(bruteForcePdp(testData, 7));