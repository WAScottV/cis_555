const findClumps = (genome, k, L, t) => {
    const clumps = {};
    for (i = 0; i <= genome.length - k; i++) {
        const kmer = genome.substring(i, i + k);
        if (clumps[kmer]) {
            clumps[kmer].push(i);
        } else {
            clumps[kmer] = [i];
        }
    }
    const clumpsOfQty_t = Object.values(clumps).filter(c => c.length >= t);
    let clumpStarts = [];
    clumpsOfQty_t.forEach(clump => {
        let temp = findClumpStart(clump, L, t);
        if (temp) {
            clumpStarts.push(temp);
        } 
    });
    let clumpString = '';
    for (i = 0; i < clumpStarts.length; i ++) {
        const s = clumpStarts[i];
        clumpString += genome.substring(s, s + t) + ' ';
    }
    console.log(clumpString);
};

const findClumpStart = (arr, L, dist) => {
    const window = { start: 0, end: dist - 1 };

    while (arr.length > window.end) {
        if (arr[window.end] - arr[window.start] <= L) {
            return arr[window.start];
        }
        window.start++;
        window.end++;
    }
    return null;
};

const genome = 'CGGACTCGACAGATGTGAAGAAATGTGAAGACTGAGTGAAGAGAAGAGGAAACACGACACGACATTGCGACATAATGTACGAATGTAATGTGCCTATGGC';

findClumps(genome, 5, 75, 4);