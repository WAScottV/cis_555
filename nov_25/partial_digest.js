let width = 0;
const results = [];
let L = [], X = [];

const partialDigest = (_L) => {
    console.time('pd');
    width = Math.max(..._L);
    L = _L.filter(v => v !== width);
    X = [0, width];
    place();
    console.timeEnd('pd');
};

const place = () => {
    if (L.length === 0) {
        results.push(X.sort((a, b) => a - b));
        return;
    }

    const y = Math.max(...L);
    const delta_y = X.map(v => Math.abs(y - v));
    if (contains(L, delta_y)) {
        X.push(y);
        delta_y.forEach(d => L.splice(L.indexOf(d), 1));
        place(L, X);
        X = X.filter(v => v !== y);
        L.push(...delta_y);
    }

    const min = width - y;
    const delta_y_2 = X.map(v => Math.abs(min - v));
    if (contains(L, delta_y_2)) {
        X.push(min);
        delta_y_2.forEach(d => L.splice(L.indexOf(d), 1));
        place(L, X);
        X = X.filter(v => v !== min);
        L.push(...delta_y_2);
    }
    return;
};

const contains = (arr, values) => {
    let matchCount = 0;
    const localArr = JSON.parse(JSON.stringify(arr));
    values.forEach(v => {
        const idx = localArr.indexOf(v);
        if (idx > -1) {
            localArr.splice(idx, 1);
            matchCount++;
        }
    });
    if (matchCount === values.length) {
        return true;
    }
    return false;
};

const testData = [2, 2, 3, 3, 4, 5, 6, 7, 8, 10];
partialDigest(testData);
console.log(results);