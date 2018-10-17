const util = require('../util');

const main = () => {
    util.readFile(process.argv[2])
        .then((file) => {
            const [dna1, dna2] = file.split(/\r?\n/);
            const dist = hammingDist(dna1, dna2);
            console.log(dist);
        })
        .catch(console.error);
}

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

main();