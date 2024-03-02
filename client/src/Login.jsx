import React,{useState,useContext} from 'react';
import {LoginContext} from './App';
import {useNavigate} from 'react-router-dom';


export default function Login() {
	const Navigate = useNavigate();
	const {loggedIn,setLoggedIn} = useContext(LoginContext);
	const [values,setValues] = useState({
		email:'',
		password:''
	})
	async function submit() {
	   const url = 'http://localhost:3000/login'	
       if(values.email==='' || values.password==='') {
           console.error("Fields cannot be empty!")   
       } else {
       	   const obj = {
       	   	method:"POST",
       	   	headers:{
       	   		"Content-Type":"application/json"
       	   	},
       	   	body:JSON.stringify(values)
       	   };
       	   try {
       	   	 const response = await fetch(url,obj);
       	   	 const data = await response.json();
       	   	 sessionStorage.setItem('id',data.id);
       	   	 Navigate('/dash')

       	   } catch(e) {
       	   	console.log(e)
       	   }
       }
	}


	return (<div className='form-column'>
		<div className='form'>
		<h2 className='form-header'>Login</h2>
		<input type='email' className='input' placeholder='Email...' onChange={({target})=>setValues({
			...values,
			email:target.value
		})}/>
		<input type='password' className='input' placeholder='Password' onChange={({target})=>setValues({
			...values,
			password:target.value
		})}/>
		<button className='btn btn-blue' onClick={submit}>Login</button>
	</div>
	</div>)
}