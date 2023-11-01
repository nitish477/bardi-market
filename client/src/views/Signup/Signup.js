import React, { useState } from 'react'
import './Signup.css'
import axios from "axios";
function Signup() {

  const [name,setName]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile,setMobile]=useState('')
  const [address,setAddress]=useState('')

  const signup = async ()=>{
    
      const responce= await axios.post('/signup',{
        name:name,
        email:email,
        password:password,
        mobile:mobile,
        address:address
      })
   alert(responce?.data?.message);

    
  }

  return (
    <div>
      <form className='form'>
         <p className='title'>Bardi Market</p>

         <div className='form-control'> 
          <label htmlFor='name'>Name</label>
          <input type="text" 
          name='name' 
          id='name' 
          placeholder='Your Name'
          className='input-box'
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          />
         </div>

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
         <div className='form-control'>
          <label htmlFor='mobile'>Mobile</label>
          <input type="mobile" 
          name='mobile' 
          id='mobile' 
          placeholder='Enter Mobile'
          className='input-box'
          value={mobile}
          onChange={(e)=>{setMobile(e.target.value)}}
          />
         </div>
         <div className='form-control'>
          <label htmlFor='address'>Address</label>
          <input type="address" 
          name='address' 
          id='address' 
          placeholder='Enter Address'
          className='input-box'
          value={address}
          onChange={(e)=>{setAddress(e.target.value)}}
          />
         </div>

         <button className='btn btn-singup' 
                type='button'
                onClick={signup}
         > Signup </button>
      </form>
    </div>
  )
}

export default Signup
