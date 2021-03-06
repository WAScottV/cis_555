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

    // populate two separate arrays: s tracks LCS and b tracks the path through the grid
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            let iMinusOne = s[i - 1][j];
            let jMinusOne = s[i][j - 1];
            let i_j_MinusOne = s[i - 1][j - 1];

            // two characters of the string are equal
            if (v[i - 1] === w[j - 1]) {
                i_j_MinusOne += 1;
                b[i][j] = MATCH;
            } else {
                // not equal; choose higher of two values
                if (s[i][j - 1] > s[i - 1][j]) {
                    b[i][j] = DELETE;
                } else {
                    b[i][j] = INSERT;
                }
            }

            // set this grid value to the greatest of these three.
            s[i][j] = Math.max(iMinusOne, jMinusOne, i_j_MinusOne);
        }
    }

    let edit_dist = 0;
    let n_pos = n;
    let m_pos = m;

    // traverse back through the grid, following path the arrows take.
    // in the event of a 'tie' between all three directions, choose diagonal.
    while (1) {
        if (n_pos === 0) {
            edit_dist += m_pos;   
            break;
        } else if (m_pos === 0) {
            edit_dist += n_pos;
            break;
        }
        if (b[n_pos][m_pos] !== MATCH) {
            edit_dist++;
        }

        let s_n_minusOne = s[n_pos - 1][m_pos];
        let s_m_minusOne = s[n_pos][m_pos - 1];
        let s_n_m_minusOne = s[n_pos - 1][m_pos - 1];

        if ((s_n_minusOne === s_m_minusOne && s_n_minusOne === s_n_m_minusOne) || (b[n_pos][m_pos] === MATCH)) {
            n_pos--;
            m_pos--;
        } else if (b[n_pos][m_pos] === INSERT) {
            n_pos--;
        } else {
            m_pos--;
        }
    }
    console.log(edit_dist);
};
editDistance(one, two);