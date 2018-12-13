const traceBack = (d) => {
    let stringV = '';
    let stringW = '';

    let start = d.find(arr => arr.find(v => v.val === overallMaxVal)).find(x => x.val === overallMaxVal);
    stringV += start.charV;
    stringW += start.charW;

    while (start.prev.length > 0) {
        start = start.prev[0];
        stringV += start.charV;
        stringW += start.charW;
    }
    console.log(stringV.split('').reverse().join(''));
    console.log(stringW.split('').reverse().join(''));
};

const generateScoringMatrix = (v, w, d) => {

    for (let i = 1; i <= v.length; i++) {
        for (let j = 1; j <= w.length; j++) {
            const del = d[i - 1][j];
            const ins = d[i][j - 1];
            const diag = d[i - 1][j - 1];
            const diagVal = v[i - 1] === w[j - 1] ? diag.val + 1 : diag.val - 1;
            const max = Math.max(del.val - 0.5, ins.val - 0.5, diagVal, 0);
            d[i][j] = { val: max, charV: '', charW: '', prev: [] };

            if (max > overallMaxVal) {
                overallMaxVal = max;
            }

            if (del.val - 0.5 === max) {
                d[i][j].prev.push(del);
                d[i][j].charV = v[i - 1];
                d[i][j].charW = '-';
            }
            if (ins.val - 0.5 === max) {
                d[i][j].prev.push(ins);
                d[i][j].charV = '-';
                d[i][j].charW = w[j - 1];
            }
            if (diagVal === max) {
                d[i][j].prev.push(diag);
                d[i][j].charV = v[i - 1];
                d[i][j].charW = w[j - 1];
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
        grid[i][0] = { val: 0, charV: '', charW: '', prev: [] };
    }
    for (let j = 1; j <= m; j++) {
        grid[0][j] = { val: 0, charV: '', charW: '', prev: [] };
    }
    return grid;
}

const first = '1213434222';
const second = '1343422421';
let overallMaxVal = 0;

const d = initGrid(first.length, second.length);
generateScoringMatrix(first, second, d);
traceBack(d);