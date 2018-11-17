let width = 0;
const results = [];

const partialDigest = (L) => {
    width = Math.max(...L);
    const withoutWidth = L.filter(v => v !== width);
    const X = [0, width];
    place(withoutWidth, X);
};

const place = (L, X) => {
    if (L.length === 0) {
        results.push(X);
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

    const delta_y_2 = X.map(v => Math.abs(width - y - v));
    if (contains(L, delta_y_2)) {
        X.push(width - y);
        delta_y_2.forEach(d => L.splice(L.indexOf(d), 1));
        place(L, X);
        X = X.filter(v => v !== (width - y));
        L.push(...delta_y_2);
    }
    return;
};

const contains = (arr, values) => {
    let matchCount = 0;
    const unique = [...new Set(arr)];
    values.forEach(v => {
        if (unique.indexOf(v) > -1) {
            matchCount++;
        }
    });
    if (matchCount === values.length) {
        return true;
    }
    return false;
};

const testData = [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 9, 9, 10, 11, 12, 15];
partialDigest(testData);
console.log(results);