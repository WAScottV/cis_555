const traceBack = (d) => {
    let stringOne = '';
    let stringTwo = '';

    let next = d.find(arr => arr.find(v => v.val === overallMaxVal)).find(x => x.val === overallMaxVal);
    
    while (1) {
        
    }
    console.log(next);
};

const generateScoringMatrix = (v, w, d) => {

    for (let i = 1; i <= v.length; i++) {
        for (let j = 1; j <= w.length; j++) {
            const del = d[i - 1][j];
            const ins = d[i][j - 1];
            const diag = d[i - 1][j - 1];
            const diagVal = v[i - 1] === w[j - 1] ? diag.val + 1 : diag.val - 1;
            const x = v[i - 1];
            const y = w[j - 1];
            const max = Math.max(del.val - 0.5, ins.val - 0.5, diagVal, 0);
            d[i][j] = { val: max, prev: [] };

            if (max > overallMaxVal) {
                overallMaxVal = max;
            }

            if (del.val - 0.5 === max) {
                d[i][j].prev.push(del);
                d[i][j].op = 'del';
            }
            if (ins.val - 0.5 === max) {
                d[i][j].prev.push(ins);
                d[i][j].op = 'ins';
            }
            if (diagVal === max) {
                d[i][j].prev.push(diag);
                d[i][j].op = 'match';
            }
        }
    }
    return d;
};

const initGrid = (n, m) => {
    const grid = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        grid[i] = new Array(m + 1);
    }
    for (let i = 0; i <= n; i++) {
        grid[i][0] = { val: 0, prev: [], op: '' };
    }
    for (let j = 1; j <= m; j++) {
        grid[0][j] = { val: 0, prev: [], op: '' };
    }
    return grid;
}

const first = '1213434222';
const second = '1343422421';
let overallMaxVal = 0;

const d = initGrid(first.length, second.length);
generateScoringMatrix(first, second, d);
traceBack(d);