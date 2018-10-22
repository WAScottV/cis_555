

let profile;

const initProfile = (k) => {
    profile = [[], [], [], [],];
    for (let i = 0; i < 4; i ++) {
        profile[i] = Array(k).fill(0, 0, k);
    }
};

const profile = {
    count: 0,
    A: [],
    C: [],
    G: [], 
    T: [],
};