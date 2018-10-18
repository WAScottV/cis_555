const util = require('../util');

const map = ['A', 'C', 'G', 'T'];
let combos = [];

const main = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [text, params] = file.split(/\r?\n/);
            const [k, d] = params.split(' ');
            combos = generateNucleotideCombos(k);
            const result = freqWithMismatches(text, parseInt(k), parseInt(d));
            console.log(result);
        })
        .catch(console.error);
};

const freqWithMismatches = (text, kmerLen, mismatchCount) => {
    const vals = [];
    let max = 0;
    
    combos.forEach(kmer => {
        const cur = occurrencesWithMismatches(text, kmer, mismatchCount);
        max = cur.count > max ? cur.count : max;
        vals.push(cur);
    });

    //vals.forEach(v => console.log(v));
    return vals.filter(v => v.count === max)
        .map(obj => obj.kmer)
        .filter(uniqueValues)
        .join(' ');
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
    return { kmer: pattern, count: retVal };
}

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

const generateNucleotideCombos = (nuclCount) => {
    const combinations = [];
    const totalCombos = Math.pow(4, nuclCount);

    for (let i = 0; i < totalCombos; i++) {
        combinations.push(toBase4(i, nuclCount));
    }
    return combinations.map(l => mapToNucleotides(l));

};

const toBase4 = (num, digits) => {
    let temp = num.toString(4);
    return temp.padStart(digits, '0');
}

const mapToNucleotides = (base4String) => {
    let str = '';
    for (let char of base4String) {
        str += map[parseInt(char)];
    }
    return str;
};

const uniqueValues = (value, index, self) => {
    return self.indexOf(value) === index;
};

main();