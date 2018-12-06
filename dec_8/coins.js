const minCoins = (money, coins) => {
    const bestNumCoins = [0];
    for (let m = 1; m <= money; m++) {
        bestNumCoins[m] = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < coins.length; i++) {
            if (m >= coins[i]) {
                if (bestNumCoins[m - coins[i]] + 1 < bestNumCoins[m]) {
                    bestNumCoins[m] = bestNumCoins[m - coins[i]] + 1;
                }
            }
        }
    }
    return bestNumCoins[money];
};

const testData = [1,3,5,12,13,16,18];
console.log(minCoins(19540, testData));