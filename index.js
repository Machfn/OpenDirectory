// Importing Required Modules & Initiating 
const express = require('express');
const path = require('path');
const fs = require('node:fs');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const exprHelpers = require('./helpers/exprHelpers');
let app = express();

// Console colors
const textGreen = '\x1b[32m';
const textRed = '\x1b[31m';
const textReset = '\x1b[0m';

// Defining/Initializing global variables
let auth = false;
let cookieTimeout = 24; // Default to 24hr timeout
let cipherSecret;
let password;
let cipherValue;
let bPass; // Buffer of password
const configPath = "./config.txt";
const whiteListPath = "./folderWhitelist.txt";
let whiteList;
let whiteListKeys = [];
let port = '3000'; // Setting default port
let owner;

// Setting required express-vars
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('views/partials', './views/partials');

// setting public assets
app.use('/public', express.static('public'));

// Load data from txt files synchronously as to not start the web server before loading all the necessary data
// Begin with config file, default port is set to 3000
try {
	const data = fs.readFileSync(configPath, 'utf8');
	dataArr = data.split("\n");
	for (i in dataArr) {
		com = dataArr[i].split("=");
		if (com[0] == "PORT") {
			port = com[1];
			console.log(`Succesfully changed port to: ${com[1]}`);
		} else if (com[0] == "OWNER") {
			owner = com[1];
			console.log(`${textGreen}Set${textReset} Owner to ${owner}`);
		} else if (com[0] == "AUTH") {
			if (com[1] == "1") { 
				auth = true;
				console.log('Authorization is enabled');
			} else {
				console.log('Authorization is currently disabled');
			}
		} else if (com[0] == 'PASSWORD') {
			password = com[1];
			console.log(`${textGreen}Set${textReset} Password`);
		} else if(com[0] == 'SECRET') {
			cipherSecret = com[1];
			console.log(`${textGreen}Set${textReset} Cipher Secret`)
		} else if(com[0] == 'AUTHTIMEOUT') {
			cookieTimeout = parseFloat(com[1]);
			console.log(`${textGreen}Set${textReset} Auth Timeout to: ${com[1]}hrs `);
		}
	}
} catch (err) { console.error(`Problem loading config file: ${err}`); }
// populate whitelist & whiteListKeys from txt file
try {
	const data = fs.readFileSync(whiteListPath, 'utf8');
	dataArr = data.split("\n");
	whiteList = new Map();
	for (i in dataArr) {
		if (dataArr[i].length != 0) {
			dirName = (dataArr[i].split("/")).at(-1);
			console.log(`\t Adding ${dataArr[i]} to whitelist`)
			whiteList.set(dirName, dataArr[i]);
			whiteListKeys.push(dirName);
			// whiteList.push(`${dirName}`);
		}
	}
} catch (err) { console.error(`Problem loading whiteList file: ${err}`); }

// Set up auth if it is enabled
try {
	if (auth) {
		const cryptoKey = crypto.scryptSync(password, cipherSecret, 24);
		const algorithm = 'aes-192-cbc';
		const iv = Buffer.alloc(16,0); //16 bytes is the required size for aes-192-cbc
		const cipher = crypto.createCipheriv(algorithm, cryptoKey, iv);
		cipherValue = cipher.final('hex');
		bPass = Buffer.alloc(16, password);
		console.log(`Successfully generated password cipher & buffer`);
	} else { console.log('Skipping auth initalization'); }
} catch (err) { console.log(`${textRed}ERROR CREATING PASSWORD CIPHER ${textReset}: ${err}`); }

//console.log(whiteList.length);
console.log((whiteList == null) ? "No Directories in Whitelist" : "Whitelisted directories successfully added");

// Check all requests for login - applies to all paths defined after this.
if (auth) {
	app.all('*path', (req, res, next) => {
		if (req.cookies.authed != undefined && exprHelpers.checkCookie(cipherValue,req.cookies.authed) ) { 
			next(); 
		} else { 
			if (req.path === '/auth') {
				next();
			} else {
				res.redirect('/auth'); 
			}
		}
	});
}

// Making all the whitelist directories available for access
try { exprHelpers.makePublicDir(whiteList, app, express); } catch (err) { console.error(err); }

// Create file selection page for folders
app.get('/selector', (req, res) => {
	let fldr = req.query.fldr;
	fldrLoc = whiteList.get(fldr);
	if (fldrLoc == undefined) {
		res.render('noDirectory', {siteOwner: owner, fldrs: whiteListKeys});
	} else {
		fs.readdir(fldrLoc, (err, files) => {
		// Use the ejs engine to pass down the array of files.
			if (err != null) {res.send('Directory in whitelist, but either does not exist or is blocked')} else {
				res.render('selector', {folder: fldr, files: files, fldrs: whiteListKeys});
			}
		});
	}
});

app.get('/auth', (req, res) => {
	res.render('auth');
});

app.post('/auth', (req, res) => {
	let b = Buffer.alloc(16, req.body.pass);
	if (crypto.timingSafeEqual(b, bPass)) {
		res.cookie('authed', cipherValue, {maxAge: (exprHelpers.toMs(cookieTimeout))});
		// res.json({message: 'Successful login', status: 200});
		res.redirect('/');
	} else {
		res.json({message: `Bad Password`, status: 400});
	}
});

// File viewer for individual files
app.get('/viewer', (req, res) => {
	let file = req.query.file;
	file = file.replaceAll('_', '/');
	res.render('viewer', {fileName: file, fldrs: whiteListKeys});
});

// Defualt Page
app.get('/', (req, res) => {
	res.render('default.ejs', {fldrs: whiteListKeys, siteOwner: owner})
});

// When user queries this it clears the auth cookie (signs them out)
app.get('/clear', (req, res) => {
	res.clearCookie('authed');
	res.redirect('/');
});


// Start Express Server
app.listen(port, () => {
	console.log(`${textGreen}Server running on port ${port}${textReset} - *You can change this in the config file`);
});
