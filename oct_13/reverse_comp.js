/***********
PROBLEM 1-4
************/

const util = require('../util');

// run program
const main = () => {
    util.readFile(process.argv[2])
        .then(file => console.log(reverseComp(file)))
        .catch(console.log);
};

const reverseComp = (pattern) => {
    compliment = [];
    for (let i = 0; i < pattern.length; i++) {
        // record compliment in same position in array.
        switch (pattern.charAt(i)) {
            case 'A':
                compliment[i] = 'T';
                break;
            case 'T':
                compliment[i] = 'A';
                break;
            case 'G':
                compliment[i] = 'C';
                break;
            case 'C':
                compliment[i] = 'G';
                break;
        }
    }
    // reverse array and create string.
    return compliment.reverse().join('');
};

main();