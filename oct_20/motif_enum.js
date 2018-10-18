const util = require('../util');
const freq = require('./freq_w_mismatches');

const main = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [params, ...dna] = file.split(/\r?\n/);
            const [k, d] = params.split(' ').map(m => parseInt(m));
            motifEnumeration(dna, k, d);
        })
        .catch(console.error);
};

const motifEnumeration = (dna, k, d) => {
    const patterns = {};
    for (let text of dna) {
        const kmers = freq.freqWithMismatches(text, k, d);
        for (let kmer of kmers) {
            if (patterns[kmer]) {
                patterns[kmer]++;
            } else {
                patterns[kmer] = 1;
            }
        }
    }
    console.log(patterns);
};

main();