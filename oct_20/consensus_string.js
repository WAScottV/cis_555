const map = ['A', 'C', 'G', 'T'];

// represents possible characters at each position
// numbers map to characters in map array above
// -1 means character is not possible at this position
const vals = [[0, 1, 2, 3], [0, 1, 2, 3], 
                [-1, -1, 2, -1], [0, 1, 2, 3], 
                [-1, -1, 2, 3], [0, 1, -1, -1]];

const getCombos = () => {
    const result = [];
    for (let i = 0; i < Math.pow(4, 6); i++) {
        let thisPoss = '', position = 0;

        // get base 4 string and reverse to start with LSB first in for loop
        let temp = toBase4(i).split('').reverse().join('');
        for(let char of temp) {

            // if possibility exists, append to string.
            // else, break and continue.
            const num = parseInt(char);
            if (vals[position++][num] !== -1) {
                thisPoss += map[num];
            } else {
                break;
            }
        }
        if (thisPoss.length === 6) {
            result.push(thisPoss);
        }
    }
    console.log(result.join(' '))
};

const toBase4 = (num) => {
    let temp = num.toString(4);
    return temp.padStart(6, '0');
}

getCombos();