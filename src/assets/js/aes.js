import CryptoJS from 'crypto-js';

const AESKEY = 'abcdefghijklmnok';
let Base64 = require('js-base64').Base64;

export default {
  encrypt (message) {
    return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(AESKEY), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  },
  decrypt (encrypt) {
    return CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(AESKEY), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  },
  encrypt_b64 (message) {
    return Base64.encode(message);
  }
};
