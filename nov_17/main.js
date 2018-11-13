const util = require('../util');
const r = require('./reconstruct');

const runReconstruct = () => {
    util.readFile(process.argv[2])
        .then(file => {
            const [k, ...kmers] = file.split(/\r?\n/);

            // filter to protect against empty lines at end of input.
            const result = r.reconstruct(parseInt(k), kmers.filter(k => k.length > 0));
            console.log(result);
        })
        .catch(console.error);
};

runReconstruct();