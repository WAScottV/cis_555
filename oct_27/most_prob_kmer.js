const map = { 'A': 0, 'C': 1, 'G': 2, 'T': 3 };

module.exports.findMostProbKmer = (text, k, profile) => {
    const result = {};
    let maxProb = 0;
    for (let i = 0; i <= text.length - k; i++) {
        const kmer = text.substring(i, i + k);
        
        // add kmer for consideration if not yet calculated.
        // otherwise, skip.
        if (!result[kmer]) {
            result[kmer] = 1;
        } else {
            break;
        }

        for (let j = 0; j < kmer.length; j++) {
            const letter = kmer.substring(j, j + 1);
            const thisProb = profile[map[letter]][j];
            result[kmer] *= thisProb;
        }
        
        if (result[kmer] > maxProb) {
            maxProb = result[kmer];
        }
    }
    return Object.keys(result).find(k => result[k] === maxProb);
};