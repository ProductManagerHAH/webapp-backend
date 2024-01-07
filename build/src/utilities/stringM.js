"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsObject = exports.createId = void 0;
const randomString = (len, char) => {
    const charSet = char || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomStringVar = '';
    // eslint-disable-next-line
    for (let i = 0; i < len; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        randomStringVar += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomStringVar;
};
// eslint-disable-next-line
const createId = () => {
    return randomString(26, 'abcdefghijklmnopqrstuvwxyz');
};
exports.createId = createId;
// eslint-disable-next-line
const containsObject = (array, object) => {
    return '';
};
exports.containsObject = containsObject;
//# sourceMappingURL=stringM.js.map