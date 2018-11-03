module.exports.reconstruct = (kmers) => {
    
    // legnth of strings to compare
    const windowLen = kmers[0].length - 2;
    let answer = '';

    // try all kmers as first pattern in text
    for (let i = 0; i < kmers.length; i++) {

        answer = kmers[i];

        // conditionally append all other kmers, excluding the current one.
        for (let j = 0; j < kmers.length; j ++) {
            if (j === i) continue;

            // only append if windows are equal; otherwise, break;
            if (answer.substring(j, j + windowLen) === kmers[j].substring(0, windowLen)) {
                answer += kmers[j].substring(windowLen + 1);
            } else {
                break;
            }
        }

        // check for new string to be correct length.
        if (answer.length === (windowLen + kmers.length + 1)) {
            break;
        }
    }

    return answer;
};