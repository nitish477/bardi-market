import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

function Order() {
    const [user,setUser]=useState({})
    useEffect(()=>{
        const getData=JSON.parse(localStorage.getItem('user')||'{}')
         if(getData?.email){
            setUser(getData)
         }
         else{
            alert('Login First')
            window.location.href = '/login';
         }
    },[])
   
  return (
   <>
    <Navbar/>
   </>
  )
}

export default Order
