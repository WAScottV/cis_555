const freqWithMismatches = (text, k, mismatchCount) => {
    const vals = [];
    let max = 0;

    const combos = generateNucleotideCombos(k);
    // iterate over all possible kmers and check for occurrence in string.
    combos.forEach(kmer => {
        const cur = occurrencesWithMismatches(text, kmer, mismatchCount);

        // track the max count for filtering at the end.
        max = cur.count > max ? cur.count : max;
        vals.push(cur);
    });

    // only return kmers that occr 'max' times
    return vals.filter(v => v.count === max)
        .map(obj => obj.kmer)
        .filter(uniqueValues);
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

// main();

module.exports = {
    freqWithMismatches: freqWithMismatches,
};