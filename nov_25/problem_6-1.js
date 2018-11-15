const multiset = (x) => {

    // in case array is not in ascending order.
    x = x.sort((a, b) => a - b);
    
    const result = [];
    for (let i = 0; i < x.length; i++) {
        for (let j = i + 1; j < x.length; j++) {
            result.push(x[j] - x[i]);
        }
    }

    // sort for readability only.
    return result.sort((a, b) => a - b);
};

module.exports.multiset = multiset;

// const testData = [12,0,1,2,5,7,9];
// console.log(multiset(testData));
