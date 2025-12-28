const crypto = require('crypto');

const makePublicDir = (l, ap, e) => {
	l.forEach((value, key, map) => {
        // console.log(`${value}, ${key}, ${map}`)
		try {
            ap.use(`/${key}`, e.static(value));
            console.log(`Initialized Directory: ` + key);
        } catch (err) {
            console.error(`Error initializing ${value}, check path: ${err}`)
        }
        
	});
}

const checkCookie = (passwdCipher, userCookie) => {
    let bP = Buffer.alloc(16, passwdCipher);
    let bU = Buffer.alloc(16, userCookie);
    return crypto.timingSafeEqual(bP, bU);
}

const toMs = hours => hours * 60 * 60 * 1000;

module.exports = {
    makePublicDir,
    checkCookie,
    toMs
}
