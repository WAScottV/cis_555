module.exports.reconstruct = (k, kmers) => {

    for (let i = 0; i < kmers.length; i++) {
        // set beginning of text to next element in array
        let text = kmers[i];

        // clone array
        const newKmers = JSON.parse(JSON.stringify(kmers));

        // remove starting element
        newKmers.splice(newKmers.indexOf(text), 1);
        let overlap = '';
        let loopCount = 1;

        while (1) {
            //get the overlap between two string to find.
            overlap = text.substring(loopCount, k + loopCount - 1);

            // get next kmer
            const next = newKmers.find(k => k.startsWith(overlap));
            if (next) {
                newKmers.splice(newKmers.indexOf(next), 1);
                text += next.substring(k - 1);
            } else {
                break;
            }
            loopCount++;
        }
        // if found, terminate algorithm
        if (text.length === (kmers.length + k - 1)) {
            return text;
        }
    }
    return null;
};