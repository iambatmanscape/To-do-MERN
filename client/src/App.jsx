import React,{useState} from 'react';
import Navigation from './Navigation'
import {Routes,Route} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

import './App.css'
export const LoginContext = React.createContext(null);


export default function App() {
  const [loggedIn,setLoggedIn] = useState(false)
  

  return (<>
  <LoginContext.Provider value={{loggedIn,setLoggedIn}}>  
    <Navigation/>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
    </Routes>
  </LoginContext.Provider>  
  </>)
}