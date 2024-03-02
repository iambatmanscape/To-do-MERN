const express = require('express');

const {signup,login,savetask,gettask,deletetask,updatetask} = require('./controller.js')


const router = express.Router()

router.post('/signup',signup);
router.post('/login',login);
router.post('/tasks',gettask);
router.post('/create',savetask);
router.delete('/remove',deletetask);
router.post('/tasks/done',updatetask)


module.exports = {router}