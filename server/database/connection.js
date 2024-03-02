const mongoose = require('mongoose');
require('dotenv').config();

async function connection(uri) {
	try {
       await mongoose.connect(uri);
       console.log('Database Connected!')
		
	} catch(e) {
		
		console.log(e);
	}
}

module.exports = {connection}