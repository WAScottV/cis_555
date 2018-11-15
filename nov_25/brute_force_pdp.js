const m = require('./problem_6-1');

const bruteForcePdp = (L, n) => {
    const M = Math.max(...L);

    for (let i = 0; i < M - (n - 2); i ++)
    {
        let X = [0];
        const temp = [];
        
        for (let j = 1; j <= (n - 2); j ++) {
            temp.push(j + i);
        }

        X.push(...temp);
        X.push(M);

        const deltaX = m.multiset(X);
        
        if (deltaX.toString() === L.toString()) {
            return X;
        }
    }
    return null; // no solution
}

const testData = [2, 3, 5];

console.log(bruteForcePdp(testData, testData.length));