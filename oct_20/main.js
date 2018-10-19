const util = require('./util');
const ham = require('./hamming_distance');
const freq = require('./freq_w_mismatches');
const motif = require('./motif_enum');

const runHammingDistance = () => {
    util.readFile(process.argv[2])
        .then((file) => {
            const [dna1, dna2] = file.split(/\r?\n/);
            const dist = ham.hammingDist(dna1, dna2);
            console.log(dist);
        })
        .catch(console.error);
}

const runFreqWithMismatches = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [text, params] = file.split(/\r?\n/);
            const [k, d] = params.split(' ').map(m => parseInt(m));
            const result = freq.freqWithMismatches(text, k, d);
            console.log(result.join(' '));
        })
        .catch(console.error);
};

const runMotifEnumeration = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [params, ...dna] = file.split(/\r?\n/);
            const [k, d] = params.split(' ').map(m => parseInt(m));
            const results = motif.motifEnumeration(dna, k, d);
            let motifs = '';
            results.forEach(r => motifs += r + ' ');
            console.log(motifs);
        })
        .catch(console.error);
};

// runHammingDistance();
// runFreqWithMismatches();
runMotifEnumeration();