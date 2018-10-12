/***********
PROBLEM 1-3
************/

const util = require('../util');

// run program.
const main = () => {
    util.readFile(process.argv[2])
        .then(text => {
            console.log(count(text, parseInt(process.argv[3])));
        })
        .catch(console.log);
};

const count = (text, k) => {
    const tempData = {};
    let max = 1;

    // iterate over string.
    for (i = 0; i <= text.length - k; i++) {
        if(tempData[text.substring(i, i + k)]) {
            // kmer already present; increment kmer count
            tempData[text.substring(i, i + k)]++;
            if (tempData[text.substring(i, i + k)] > max) {
                // found the (currently) most frequent kmer.
                max++;
            }
        } else {
            //new kmer
            tempData[text.substring(i, i + k)] = 1;
        }
    }
    let kmerString = '';

    // loop over all kmers
    for (const kmer in tempData) {
        if (tempData[kmer] === max) {
            //max kmer found. append to string.
            kmerString += `${kmer} `;
        }
    }
    return kmerString;
};

main();