const mpk = require('./most_prob_kmer');

const map = { 'A': 0, 'C': 1, 'G': 2, 'T': 3 };
let profile;

module.exports.greedyMotifSearch = (dna, k, t) => {
    let bestMotifs = dna.map(d => d.substring(0, k));

    for (let i = 0; i <= dna[0].length - k; i++) {
        initProfile(k);

        const motifs = [dna[0].substring(i, i + k)];
        updateProfile(motifs[0]);
        for (let j = 1; j < t; j++) {
            motifs[j] = mpk.findMostProbKmer(dna[j], k, profile.map(t => t.map(m => m / j)));
            updateProfile(motifs[j]);
        }
        if (score(motifs) > score(bestMotifs)) {
            bestMotifs = motifs;
        }
    }
    return bestMotifs;
};

const initProfile = (k) => {
    profile = [[], [], [], [],];
    for (let i = 0; i < 4; i ++) {
        profile[i] = Array(k).fill(0);
    }
};

const updateProfile = (motif) => {
    for (let i = 0; i < motif.length; i++) {
        const nuc = motif.substring(i, i + 1);
        profile[map[nuc]][i]++;
    }
};

const score = (motifs) => {
    const motifLength = motifs[0].length;
    const charOccurs = { A: Array(motifLength).fill(0), 
                            C: Array(motifLength).fill(0), 
                            G: Array(motifLength).fill(0), 
                            T: Array(motifLength).fill(0), }

    for (let i = 0; i < motifs.length; i++) {
        for (let j = 0; j < motifLength; j++) {
            charOccurs[motifs[i][j]][j] += 1;
        }
    }

    let totalScore = 0;
    for (let i = 0; i < motifLength; i++) {
        let thisMax = 0;
        Object.keys(charOccurs).forEach(k => {
            if (charOccurs[k][i] > thisMax) {
                thisMax = charOccurs[k][i];
                thisLetter = k;
            }
        });
        totalScore += (thisMax - motifLength);
    }
    return totalScore;
};