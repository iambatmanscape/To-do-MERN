const {User} = require('./database/models/users.js');
const {Task} = require('./database/models/task.js')



const signup = async (req,res)=>{
	const user = req.body;
	try {
		const newUser = new User(user);
		await newUser.save();
		return res.status(201).json({msg:'Successfull signup'})
	} catch(e) {
		
		console.log(e);
	}
}

const login = async (req,res)=>{
	const email = req.body.email;
	try {
		const user = await User.findOne({email});
		if(user) {
			if(user.password === req.body.password) {
                return res.status(200).json({id:user._id})
			} else {
				return res.send('Invalid Password!')
			}

		} else {
			return res.status(400).json({msg:'User not Found!'})
		}
		
	} catch(e) {
		
		console.log(e);
	}
}

const savetask = async (req,res)=>{
	const task = req.body;
	try {
		const newTask = new Task(task);
		await newTask.save()
	    return res.status(201).json(task)
		
	} catch(e) {
		
		console.log(e);
		return res.status(400).json({msg:'Error while saving'})
	}
}

const gettask = async (req,res)=>{
	const id = req.body.id;
	try {
		const tasks = await Task.find({from:id});
		return res.status(200).json(tasks)
	} catch(e) {
		return res.status(500).json({msg:'Server Error!'})
		console.log(e);
	}
}

const deletetask = async (req,res)=>{
	const taskid = req.body.id;
	try {
		const deletedPost = await Task.deleteOne({id:taskid})
		return res.status(200).json({deletedid:taskid})
	} catch(e) {
		
		console.log(e);

	}
}

const updatetask = async (req,res)=>{
	const taskid = req.body.id;
	try {
		const task = await Task.findOne({id:taskid});
		task.completed = !task.completed;
		await task.save();
		return res.status(200).json({msg:'task completed'})
	} catch(e) {
		
		console.log(e);
		return res.status(500).json({msg:'Error while updation!'})
	}
}


module.exports = {signup,login,savetask,gettask,deletetask,updatetask}