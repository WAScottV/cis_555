const location = {
    v_loc: 0,
    w_loc: 0
}

const generateScoringMatrix = (v, w, d) => {
    const grid = [];

    for (let i = 1; i < v.length; i++) {
        for (let j = 1; j < w.length; j++) {
            const del = d[i - 1][j];
            const ins = d[i][j - 1];
            const match = d[i - 1][j - 1];
        }
        const thisOne = { val: 0, prev: [] };
    }
};

const initGrid = (n, m) => {
    const grid = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        grid[i] = new Array(m + 1);
    }
    for (let i = 0; i <= n; i++) {
        grid[i][0] = { val: 0, prev: [] };
    }
    for (let j = 1; j <= m; j++) {
        grid[0][j] = { val: 0, prev: [] };
    }
    return grid;
}

console.log(initGrid(8, 8));