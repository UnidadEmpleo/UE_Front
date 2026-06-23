import CryptoJS from "crypto-js";
const SECRET_KEY = process.env.VUE_APP_STORAGE_SECRET; // Usa una clave fuerte y mantenla segura


const localStorageService = {
  get(key, defaultValue = null) {
    try {
      
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return defaultValue;
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      /*
      if (key=='userInfo')
        console.log('userInfo '+ decrypted)
      if (key == 'userdata')
        console.log('userData '+ decrypted)
      if (key == 'externalUser')
        console.log('externalUser '+ decrypted)
      */
      
      return decrypted ? JSON.parse(decrypted) : defaultValue;
      //return encrypted //localStorage.getItem(key);
    } catch (e) {
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString(); 
      localStorage.setItem(key, encrypted);
    } catch (e) {
      // Maneja el error si es necesario
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};

export default localStorageService;