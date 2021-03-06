const util = require('../util');
const kC = require('./kmer_comp');
const r = require('./reconstruct');

const runKmerComposition = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [k, text] = file.split(/\r?\n/);
            const result = kC.kmerComposition(parseInt(k), text);
            console.log(result.join('\r\n'));
        })
        .catch(console.error);
};

const runReconstruct = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const kmers = file.split(/\r?\n/);

            // filter to protect against empty lines at end of input.
            const result = r.reconstruct(kmers.filter(k => k.length > 0));
            console.log(result);
        })
        .catch(console.error);
};

// runKmerComposition();
runReconstruct();