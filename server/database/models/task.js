const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	id:{
        type:String,
        required:true
	},
	title:{
		type:String,
		required:true
	},
	details:{
		type:String,
		required:true
	},
	dueBy:{
		type:Date,
		required:true
	},
	from:{
		type:String,
		required:true
	},
	completed:{
		type:Boolean,
	    default:false
	}

})

const Task = mongoose.model('task',taskSchema);

module.exports = {Task}