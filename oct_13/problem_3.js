const util = require('../util');

const main = () => {
    util.readFile(process.argv[2])
        .then(text => {
            console.log(count(text, parseInt(process.argv[3])));
            //temp.keys.foreach(k => console.log(k));
        })
        .catch(console.log);
};

const count = (text, k) => {
    const tempData = {};
    let max = 1;
    for (i = 0; i <= text.length - k; i++) {
        if(tempData[text.substring(i, i + k)]) {
            tempData[text.substring(i, i + k)]++;
            if (tempData[text.substring(i, i + k)] > max) {
                max++;
            }
        } else {
            tempData[text.substring(i, i + k)] = 1;
        }
    }
    let kmerString = '';
    for (const kmer in tempData) {
        if (tempData[kmer] === max) {
            kmerString += `${kmer} `;
        }
    }
    return kmerString;
};

main();