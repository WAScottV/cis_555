const util = require('../util');

const dictionary = { 'A': 0, 'C': 1, 'G': 2, 'T': 3 };

const main = () => {
    util.readFile(process.argv[2])
        .then(file => {
            // const [text, params] = file.split(/\r?\n/);
            // const [ k, d ] = params.split(' ');
            // const x = freqWithMismatches(text, parseInt(k), parseInt(d));
            // console.log(x);
            console.log(possibilities('AA', 1));
        })
        .catch(console.error);
};

const hammingDist = (dna1, dna2) => {

    let hDist = 0;
    for (let i = 0; i < dna1.length; i++) {
        if (dna1.substring(i, i + 1) !== 
            dna2.substring(i, i + 1)) {
                hDist++;
        }
    }
    return hDist;
};

const occurrencesWithMismatches = (text, pattern, mismatchCount) => {
    const len = pattern.length;
    let retVal = 0;
    for (let i = 0; i <= text.length - len; i++) {
        const hd = hammingDist(text.substring(i, i + len), pattern);
        if (hd <= mismatchCount) {
            retVal++;
        }
    }
    return {kmer: pattern, count: retVal};
}

const possibilities = (kmer, d) => {
    const perms = [];
    for (let i = 0; i <= kmer.length - d; i ++) {
        for (let j = 0; j < d; j++) {
            const x = replaceLetterAtPos(kmer, d + i, 'a');
            perms.push(x);
        }
    }
    return perms;
};

const replaceLetterAtPos = (text, pos, newLetter) => {
    let beginning = '';
    if (pos === 0 ) {
        return newLetter + text.substring(1);
    } else {
        beginning = text.substring(0, pos);
        return beginning + newLetter + text.substring(pos + 1);
    }

};

const freqWithMismatches = (text, kmerLen, mismatchCount) => {
    const vals = [];
    let max = 0;
    for (let i = 0; i < text.length - kmerLen; i++) {
        const thisKmer = text.substring(i, i + kmerLen);
        const cur = occurrencesWithMismatches(text, thisKmer, mismatchCount);
        max = cur.count > max ? cur.count : max;
        vals.push(cur);
    }

    vals.forEach(v => console.log(v));
    return vals.filter(v => v.count === max)
        .map(obj => obj.kmer)
        .join(' ');
};

main();