const express = require('express');
const {connection} = require('./database/connection.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {router} = require('./routes.js')
app.use(cors())
app.use(bodyParser.json({extended:true}));


app.use('/',router)
connection(process.env.MONGO_DB);




app.listen(3000,()=>{
	console.log('Server is listening!')
})