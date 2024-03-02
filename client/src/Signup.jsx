import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Signup() {
    const Navigate = useNavigate();
	const [values,setValues] = useState({
		name:'',
		email:'',
		password:''
	})

	async function submit() {
		const url = 'http://localhost:3000/signup';
		if(values.name==='' || values.email==='' || values.password==='') {
			console.error("Fields cannot be empty!")
		} else {
			const obj = {
				method:"POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(values)
			};
			
			try {
				const response = await fetch(url,obj);
				const data = await response.json();
                Navigate('/login')

			} catch(e) {
                console.error(e)
			}
		}

	}


	return (<div className='form-column'>
		<div className='form'>
		<h2 className='form-header'>Sign Up</h2>
		<input type='text' className='input' placeholder='Name...' onChange={({target})=>setValues({
			...values,
			name:target.value
		})}/>
		<input type='email' className='input' placeholder='Email...' onChange={({target})=>setValues({
			...values,
			email:target.value
		})}/>
		<input type='password' className='input' placeholder='Password' onChange={({target})=>setValues({
			...values,
			password:target.value
		})}/>
		<button className='btn btn-blue' onClick={submit}>Signup</button>
	</div>
	</div>)
}