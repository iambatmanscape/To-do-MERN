import React,{useState,useContext} from 'react';
import { RxCross2 } from "react-icons/rx";
import { v4 as uuidv4 } from 'uuid';
import {PostContext} from './Dashboard'

export default function CreateTask({cancel}) {
	const {post,setPost} = useContext(PostContext);
   const [postDetails,setPostDetails] = useState({
   	title:'',
   	details:'',
   	dueBy:'',
   	from:sessionStorage.getItem('id'),
   	id:''

   })

   async function savepost() {
   	 if(postDetails.title==='' || postDetails.details==='' || postDetails.dueBy==='') {
   	 	console.log('Fields cannot be empty!')
   	 } else {
   	 	const uid = uuidv4();
   	 	const url = 'https://to-do-mern-0wr6.onrender.com/create'
   	 	const obj = {
       	   	method:"POST",
       	   	headers:{
       	   		"Content-Type":"application/json"
       	   	},
       	   	body:JSON.stringify({...postDetails,id:uid})
       	   };
   	 	try {
            const response = await fetch(url,obj);
            const data = await response.json();
            setPost({...post,data})
            cancel()
   	 	} catch(e) {
   	 		console.log(e)
   	 	}
   	 }
   }

	return (<div className='overlay'>
		<div className='create-task-container'>
		<div className='create-task'>
		  <span className='flex-between'>
			<h2 className='create-task-title'>Create Task</h2>
			<RxCross2 onClick={cancel}/>
          </span>
          <input type='text' className='input' placeholder='Task-title...' onChange={({target})=>setPostDetails({...postDetails,title:target.value})}/> 
          <input type='textarea' className='input' placeholder='Task-details...' onChange={({target})=>setPostDetails({...postDetails,details:target.value})}/>
          <input type='date' className='input' onChange={({target})=>setPostDetails({...postDetails,dueBy:target.value})}/>
          <button className='center btn btn-blue' onClick={savepost}>Save Post</button>
		</div>
		</div>
	</div>)
}