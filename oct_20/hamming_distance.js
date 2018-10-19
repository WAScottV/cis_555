const hammingDist = (dna1, dna2) => {

    let hDist = 0;
    for (i = 0; i < dna1.length; i++) {
        if (dna1.substring(i, i + 1) !== 
            dna2.substring(i, i + 1)) {

                hDist++;
        }
    }
    return hDist;
};

module.exports = {
    hammingDist: hammingDist,
};