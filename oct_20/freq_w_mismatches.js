const util = require('../util');

const map = ['A', 'C', 'G', 'T'];
let combos = [];

const main = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [text, params] = file.split(/\r?\n/);
            const [k, d] = params.split(' ');
            combos = generateNucleotideCombos(d);
            const result = freqWithMismatches(text, parseInt(k), parseInt(d));
            console.log(result);
        })
        .catch(console.error);
};

const freqWithMismatches = (text, kmerLen, mismatchCount) => {
    const vals = [];
    let max = 0;

    for (let i = 0; i < text.length - kmerLen; i++) {
        const thisKmer = text.substring(i, i + kmerLen);

        const possibleKmers = createPossibleKmers(thisKmer);
        possibleKmers.forEach(kmer => {
            const cur = occurrencesWithMismatches(text, kmer, mismatchCount);
            max = cur.count > max ? cur.count : max;
            vals.push(cur);
        });
    }

    vals.forEach(v => console.log(v));
    return vals.filter(v => v.count === max)
        .map(obj => obj.kmer)
        .filter(uniqueValues)
        .join(' ');
};

const createPossibleKmers = (origKmer) => {
    const retVals = [];
    const charsToReplace = combos[0].length;
    for (let repStart = 0; repStart <= origKmer.length - charsToReplace; repStart++) {
        for (let j = 0; j < combos.length; j++) {
            if (repStart === 0) {
                retVals.push(combos[j] + origKmer.substring(charsToReplace));
            } else if (repStart + charsToReplace === origKmer.length) {
                retVals.push(origKmer.substring(0, repStart) + combos[j]);
            } else {
                retVals.push(origKmer.substring(0, repStart) + combos[j] + origKmer.substring(repStart + charsToReplace));
            }
        }
    }
    return retVals.filter(uniqueValues);
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