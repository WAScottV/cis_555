module.exports.reconstruct = (kmers) => {
    const len = kmers[0].length - 2;
    let answer = '';
    for (let i = 0; i < kmers.length; i++) {

        answer = kmers[i];
        for (let j = 0; j < kmers.length; j ++) {
            if (j === i) continue;

            if (answer.substring(j, j + len) === kmers[j].substring(0, len)) {
                answer += kmers[j].substring(len + 1);
            }
        }

        if (answer.length === (len + kmers.length + 1)) {
            break;
        }
    }

    return answer;
};