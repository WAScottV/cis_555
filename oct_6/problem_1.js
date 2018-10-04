const fs = require('fs');

const main = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(countNucleotides(data));
    });
};

const countNucleotides = (s) => {
    let a = 0, c = 0, g = 0, t = 0;
    s.split('').forEach(e => {
        if (e === 'A') a++;
        else if (e === 'C') c++;
        else if (e === 'G') g++;
        else if (e === 'T') t++;
    });
    return `${a} ${c} ${g} ${t}`;
};

main(process.argv[2]);