const motifEnumeration = (dna, k, d) => {
    const patterns = {};

    // loop over all strings in dna
    for (let string of dna) {

        // get all qualifying kmers
        const kmers = findKmerWithMismatch(string, k, d);
        for (let kmer of kmers) {

            // increment counter for each time kmer is found
            // in one of the strings
            if (patterns[kmer]) {
                patterns[kmer]++;
            } else {
                patterns[kmer] = 1;
            }
        }
    }

    // return only kmers that are found in all strings.
    const inEveryString = [];
    Object.keys(patterns).forEach(p => {
        if (patterns[p] === dna.length) inEveryString.push(p);
    });
    return inEveryString;
};

const findKmerWithMismatch = (text, k, mismatchCount) => {
    const vals = [];

    const combos = generateNucleotideCombos(k);
    // iterate over all possible kmers and check for occurrence in string.
    combos.forEach(kmer => {
        const cur = occurrencesWithMismatches(text, kmer, mismatchCount);
        vals.push(cur);
    });
    return vals.filter(v => v.count > 0)
        .map(obj => obj.kmer)
        .filter(uniqueValues);
};

// create all possible nucleotiede combos for given count nuclCount
const generateNucleotideCombos = (nuclCount) => {
    const combinations = [];
    const totalCombos = Math.pow(4, nuclCount);

    for (let i = 0; i < totalCombos; i++) {
        // generate base 4 numbers to maps to A,C,G,T
        combinations.push(toBase4(i, nuclCount));
    }

    // map base 4 to nuc. letter
    return combinations.map(l => mapToNucleotides(l));

};

// check whole DNA string and return # of occurrences of pattern
// with no more than mismatchCount mismatches
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

const toBase4 = (num, digits) => {
    let temp = num.toString(4);
    return temp.padStart(digits, '0');
}

// 0 = A; 1 = C; 2 = G; 3 = T
const map = ['A', 'C', 'G', 'T'];

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

module.exports = {
    motifEnumeration: motifEnumeration,
};