import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login= async ()=>{
        const responce= await axios.post('/login',{
            email:email,
            password:password
        })

      alert(responce?.data?.message)

      if(responce?.data?.success===true){
        localStorage.setItem('user',JSON.stringify(responce?.data?.data))
        window.location.href='/'
      }
    }
   
  return (
    <div>
        <form className='form'>
            <h1 className='title'>Login</h1>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input type="email" 
          name='email' 
          id='email' 
          placeholder='Enter Email'
          className='input-box'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          />
         </div>
         <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input type="password" 
          name='password' 
          id='password' 
          placeholder='Enter Password'
          className='input-box'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          />
         </div>
         <button className='btn login-btn' onClick={login} type='button'>Login</button>
         </form>
    </div>
  )
}

export default Login
