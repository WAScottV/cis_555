const MATCH = '/';
const INSERT = '|';
const DELETE = '-';

const editDistance = (v, w) => {
    const n = v.length;
    const m = w.length;

    // init array grid
    const s = new Array(n + 1);
    const b = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        s[i] = new Array(m + 1);
        b[i] = new Array(m + 1);
    }
    for (let i = 0; i <= n; i++) {
        s[i][0] = 0;
    }
    for (let j = 1; j <= m; j++) {
        s[0][j] = 0;
    }
    // end init array grid

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            let iMinusOne = s[i - 1][j];
            let jMinusOne = s[i][j - 1];
            let i_j_MinusOne = 0;
            if (v[i] === w[j]) {
                i_j_MinusOne = s[i - 1][j - 1] + 1;
            }
            s[i][j] = Math.max(iMinusOne, jMinusOne, i_j_MinusOne);
            
            switch (s[i][j]) {
                case s[i - 1][j]:
                    b[i][j] = INSERT;
                    break;
                case s[i][j - 1]:
                    b[i][j] = DELETE;
                    break;
                case s[i - 1][j - 1] + 1:
                    b[i][j] = MATCH;    
                    break;
            }
        }
    }
    console.log(s);
    console.log(b);
};

editDistance('atcgtac', 'atgttat');