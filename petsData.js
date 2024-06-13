const PETS_DATA = {
    L1 : [
        '(\\__/)',
        '(\\(\\ ',
        '(\\__(\\',
    ],
    L2 : [
        '(=\'.\'=)',
        '( -.-)',
        '(o^.^)',
        '( o o)',
        '( T_T)',
        '(=°~°=)',
        '( -_-)',
        '(>_<)',
    ],
    L3 : [
        '(")_(")',
        'o_(")(")',
        'z(_(")(")',
        '(>")(")',
        '!(_(")(")',
    ],
};

function getRandomPartIndex(partType) {
    const availableParts = PETS_DATA[partType];
    const randomIndex = Math.floor(Math.random() * availableParts.length);
    return randomIndex;
}

function getRandomParts(count) {
    const petParts = [];
    for (let i = 0; i < count; i++) {
        const pet = {
            L1: getRandomPartIndex('L1'),
            L2: getRandomPartIndex('L2'),
            L3: getRandomPartIndex('L3'),
        };
        petParts.push(pet);
    }
    return petParts;
}

module.exports = {
    PETS_DATA,
    getRandomParts,
  };