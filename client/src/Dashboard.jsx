import React,{useState,useEffect} from 'react';
import Post from './Post';
import CreateTask from './CreateTask';
export const PostContext = React.createContext(null);


export default function Dashboard() {
	const [showModal,setShowModal] = useState(false);
    const [post,setPost] = useState([])


    async function getPost() {
      const url = 'https://to-do-mern-0wr6.onrender.com/tasks';
      const id = sessionStorage.getItem('id');
      const obj = {
       	   	method:"POST",
       	   	headers:{
       	   		"Content-Type":"application/json"
       	   	},
       	   	body:JSON.stringify({id})
       	   };
      try {
         const response = await fetch(url,obj);
         const data = await response.json()
         setPost(data)
      } catch(e) {
         console.log(e)
      }
   }

 

   useEffect(()=>{
   	 getPost()
   },[post])
    


	function removeModal() {
		setShowModal(false)
	}

	return (<div className='task-container'>
		<button className='center btn btn-purp' onClick={()=>setShowModal(prev=>!prev)}>Add Task</button>
		<PostContext.Provider value={{post,setPost}}>
		{(post.length>0)?(post.map((p)=><Post id={p.id} key={p.id} title={p.title} details={p.details} dueBy={p.dueBy} completed={p.completed}/>)):(<h2 className='center'>Nothing to show...</h2>)}
		{showModal && <CreateTask cancel={removeModal}/>}
		</PostContext.Provider>
		
	</div>)
}

