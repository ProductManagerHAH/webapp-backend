
const randomString = (len: number, char: string) =>  {
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
export const createId = () => {
    return randomString(26, 'abcdefghijklmnopqrstuvwxyz');
};

// eslint-disable-next-line
export const containsObject = (array: Array<any>, object: any) => {
    return '';
}; 






