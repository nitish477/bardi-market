import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import './Order.css'
import { Link } from 'react-router-dom'

function Order() {
    const [user,setUser]=useState({})
    const [order,setOrder]=useState([])

   const loadOrder= async()=>{
      const userId=user?._id
    if(!userId){
      return
    }

      const responce = await axios.get(`/user/order/${userId}`)
      setOrder(responce?.data?.data)
   }

   useEffect(()=>{
        loadOrder();
   },[user])
    

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

    const color_map={
      'pending':'danger',
      'shipped':'warning',
      'deleverd': 'success'
    }
   
  return (
   <>
    <Navbar/>
    <div>
      {
         order?.map((obj,i)=>{
            const {Product,status,quantity,deleveryCharges}=obj
            return(
               <>
                 <div className='show-order'>
              <h3>   <Link to={`/buynow/${Product._id}`} className='order-product-name'>  {Product.name}</Link></h3>
               <p>{Product.price} x <span>{quantity}</span> = <strong> ₹{Product.price*quantity}</strong></p> 
               <p className={`status ${color_map[status ]}`}>{status}</p>
                 </div>
               </>
            )
         })
      }
    </div>

   </>
  )
}

export default Order
