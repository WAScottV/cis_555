const util = require('../util');
const mpk = require('./most_prob_kmer');
const g = require('./greedy_motif_search');

const runMostProbKmer = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [text, k, ...rawProfile] = file.split(/\r?\n/);
            const profile = rawProfile.map(p => p.split(' ').map(Number));
            const kmer = mpk.findMostProbKmer(text, parseInt(k), profile);
            console.log(kmer.join(' '));
        })
        .catch(console.error);
};

const runGreedyMotif = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [params, ...dna] = file.split(/\r?\n/);
            const [k, t] = params.split(/\s/).map(m => parseInt(m));
            const result = g.greedyMotifSearch(dna, k, t);
            console.log(result.join(' '));
        })
        .catch(console.error);
};

// runMostProbKmer();
runGreedyMotif();