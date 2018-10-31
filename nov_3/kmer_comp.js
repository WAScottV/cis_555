
module.exports.kmerComposition = (k, text) => {
    const comp_k = [];
    for (let i = 0; i <= text.length - k; i++) {
        comp_k.push(text.substring(i, i + k));
    }
    return comp_k;
};