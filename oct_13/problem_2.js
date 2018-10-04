const util = require('../util');

const main = () => {
    util.readFile(process.argv[2])
        .then(text => console.log(count(text, process.argv[3])))
        .catch(console.log);
};

const count = (text, pattern) => {
    kmerLen = pattern.length;
    kmerCount = 0;
    for (i = 0; i < text.length; i++) {
        if (text.substring(i, i + kmerLen) === pattern) {
            kmerCount++;
        }
    }
    return kmerCount;
};

main();