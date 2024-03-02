import React,{useState,useEffect,useContext,useRef} from 'react';
import {PostContext} from './Dashboard';
import { FaRegTrashCan } from "react-icons/fa6";


export default function Task({title,details,dueBy,id,completed}) {
   const {post,setPost} = useContext(PostContext);
   const checkRef = useRef();
   const [taskDone,setTaskDone] = useState(false)
   
   async function delPost() {
      const url = 'http://localhost:3000/remove'
      const obj = {
               method:"DELETE",
               headers:{
                  "Content-Type":"application/json"
               },
               body:JSON.stringify({id})
            };
            try {
                const response = await fetch(url,obj);
                const res = await response.json();
                setPost(post.filter((p)=>p.id!==res.deletedid))
                alert('Post Deleted!')

            } catch(e) {
               console.log(e)
            }
   }

   async function updateTask() {
      const url = 'http://localhost:3000/tasks/done'
      const obj = {
               method:"POST",
               headers:{
                  "Content-Type":"application/json"
               },
               body:JSON.stringify({id})
            };
            try {
                const response = await fetch(url,obj);
                checkRef.current.disabled=true;
                const res = await response.json();
                checkRef.current.disabled=false;

            } catch(e) {
               console.log(e)
            }
   }
   
   

   return (<div className='task'>
      <span className='flex-between'>
   	 <h2 className='task-header'>{title}</h2>
       <FaRegTrashCan style={{color:'red',fontSize:'1.3rem'}} onClick={delPost}/>
      </span> 
   	 <p className='task-details'>{details}</p>
       <div className='flex-between'>
   	 <span className='task-dueby'>{dueBy.split('T')[0]}</span>
       <span className='flex-between'>
       {(completed)?(<input ref={checkRef} className='task-done' type='checkbox' id='done' onChange={updateTask} checked/>):<input ref={checkRef} className='task-done' type='checkbox' id='done' onChange={updateTask}/>}    
       <label htmlFor='done'>Task completed</label>
       </span>
       </div>
   </div>)
}

