const mpk = require('./most_prob_kmer');

const map = { 'A': 0, 'C': 1, 'G': 2, 'T': 3 };
let profileData;
let pseudo;

module.exports.greedyMotifSearch = (dna, k, t, pseudo = false) => {
    // set to first kmer in each DNA string
    let bestMotifs = dna.map(d => d.substring(0, k));

    // for each kmer in first DNA string
    for (let i = 0; i <= dna[0].length - k; i++) {
        initProfile(k);

        const motifs = [dna[0].substring(i, i + k)];
        let profile = updateProfile(motifs[0], pseudo);
        for (let j = 1; j < t; j++) {
            motifs[j] = mpk.findMostProbKmer(dna[j], k, profile);
            profile = updateProfile(motifs[j], pseudo);
        }
        if (score(motifs) < score(bestMotifs)) {
            bestMotifs = motifs;
        }
    }
    return bestMotifs;
};

const initProfile = (k) => {
    profileData = [[], [], [], [],];
    for (let i = 0; i < 4; i ++) {
        profileData[i] = Array(k).fill(0);
    }
};

const updateProfile = (motif, pseudo) => {

    // update raw data for profile
    for (let i = 0; i < motif.length; i++) {
        const nuc = motif.substring(i, i + 1);
        profileData[map[nuc]][i]++;
    }

    for (let i = 0; i < 4; i ++) {
        for (let j = 0; j < profileData[0].length; j++) {
            profileData[i][j]++;
        }
    }

    const pseudoCount = 0;
    // return "normalized" profile
    return profileData.map(p => p.map(m => m / profileData.length));
};

const score = (motifs) => {
    const motifLength = motifs[0].length;
    const charOccurs = { A: Array(motifLength).fill(0), 
                            C: Array(motifLength).fill(0), 
                            G: Array(motifLength).fill(0), 
                            T: Array(motifLength).fill(0), }

    // for each motif
    for (let i = 0; i < motifs.length; i++) {
        // for each character in the motif
        for (let j = 0; j < motifLength; j++) {
            // increment occurrence count of character
            charOccurs[motifs[i][j]][j] += 1;
        }
    }

    // calculate score
    let totalScore = 0;

    // for every character position in each motif
    for (let i = 0; i < motifLength; i++) {
        let thisMax = 0;

        // check each character count and find max
        Object.keys(charOccurs).forEach(k => {
            if (charOccurs[k][i] > thisMax) {
                thisMax = charOccurs[k][i];
            }
        });
        totalScore += (motifLength - thisMax);
    }
    return totalScore;
};