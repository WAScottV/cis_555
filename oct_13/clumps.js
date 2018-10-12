/***********
PROBLEM 1-5
************/

const util = require('../util');

//run program.
const main = () => {
    util.readFile(process.argv[2])
        .then(file => console.log(findClumps(file, parseInt(process.argv[3]), 
            parseInt(process.argv[4]), parseInt(process.argv[5]))))
        .catch(console.log);
};

const findClumps = (genome, k, L, t) => {
    const clumps = {};

    // log clump to array
    const logClump = (kmer) => {
        if (clumps[kmer]) {
            clumps[kmer].push(i);
        } else {
            clumps[kmer] = [i];
        }
    };

    // iterate over whole genome string
    for (i = 0; i <= genome.length - k; i++) {
        const kmer = genome.substring(i, i + k);
        logClump(kmer);
    }

    // see if there are enough clumps (at least t clumps in the whole string)
    const getClumpsMeetingFreqCrit = () => 
        Object.values(clumps).filter(kmers => kmers.length >= t);

    const clumpsOfQty_t = getClumpsMeetingFreqCrit();
    let clumpStarts = [];

    // check to see if freq. occurring clumps happen within L positions of each other.
    clumpsOfQty_t.forEach(clump => {
        let startPos = returnClumpStartIfQualifies(clump, L, t);
        if (startPos) {
            clumpStarts.push(startPos);
        }
    });

    let clumpString = '';
    
    // generate clump string
    for (i = 0; i < clumpStarts.length; i ++) {
        const s = clumpStarts[i];
        clumpString += genome.substring(s, s + k) + ' ';
    }
    return clumpString;
};

// determine distance of clump start to clump end.
const returnClumpStartIfQualifies = (arr, L, t) => {
    const window = { start: 0, end: t - 1 };

    const qualifiesAsClump = () => arr[window.end] - arr[window.start] <= L;

    while (arr.length > window.end) {
        if (qualifiesAsClump()) {
            return arr[window.start];
        }
        window.start++;
        window.end++;
    }
    return null;
};

main();