import React,{useState,useContext,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {LoginContext} from './App';


export default function Navigation() {
	const Navigate = useNavigate()
	const {loggedIn,setLoggedIn} = useContext(LoginContext);
	const [id,setId] = useState(sessionStorage.getItem('id'));
	 useEffect(()=>{
 	     if(id!==null) {
 	     	setLoggedIn(true);
 	     } else {
 	     	setLoggedIn(false)
 	     }
 },[id])
	 function logout() {
	 	sessionStorage.removeItem('id');
	 	setLoggedIn(false)
	 	Navigate('/')
	 }

	return (<nav className='navbar'>
		<h2 className='nav-header'>To-Do</h2>
		<div className='options'>
		  {(loggedIn)?<Loggedin logout={logout}/>:<NotLoggedin/>}
		</div>
	</nav>)
}



function NotLoggedin() {
	return (<>
		<Link style={{textDecoration:'none',marginRight:'0.5rem'}} to='/login'>Login</Link>
	    <Link style={{textDecoration:'none'}} to='/'>Signup</Link>
		</>)
}

function Loggedin({logout}) {
	return (<>
		<Link style={{textDecoration:'none',marginRight:'0.5rem'}} to='/home'>Dashboard</Link>
	    <Link style={{textDecoration:'none'}} to='' onClick={logout}>Logout</Link>
	</>)
}