import * as crypto from 'crypto';


export default  class CryptoClass {

    public  encrypt(str: string, code: string): string {
        if (typeof str === 'string') {
            if (str.length > 0) {
                const cipherAlgorithm = 'aes-256-gcm';

                const key = crypto
                    .createHash('sha256')
                    .update(code)
                    .digest('base64')
                    .substring(0, 32);


                const initVector = crypto.randomBytes(16);
                const initVectorHex = initVector.toString('hex');
                const cipher = crypto.createCipheriv(cipherAlgorithm, key, initVector);
                const encoded = cipher.update(str, 'utf-8', 'hex') + cipher.final('hex');
                const authTag = cipher.getAuthTag().toString('hex');
                const metaAndEncoded = [authTag, initVectorHex, encoded].join('|');

                return metaAndEncoded;
            } 
                return '';
            
        } 
            return '';
        


    }

        public decrypt(str: string, code: string): string {




            if (str.split('|').length > 2) {
                const cipherAlgorithm = 'aes-256-gcm';
                const key = crypto
                    .createHash('sha256')
                    .update(code)
                    .digest('base64')
                    .substring(0, 32);


                const [authTag, initVectorHex, encrypted] = str.split('|');
                const initVector = Buffer.from(initVectorHex, 'hex');
                const decipher = crypto.createDecipheriv(cipherAlgorithm, key, initVector);
                decipher.setAuthTag(Buffer.from(authTag, 'hex'));
                const decrypted =
                    decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf-8');

                return decrypted;
            } 
                return '';
            



        }


}



