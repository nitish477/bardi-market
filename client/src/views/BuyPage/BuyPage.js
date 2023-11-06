import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import './BuyPage.css'

function BuyPage() {
    const [product,setProduct]=useState({})
    const {id}=useParams()


    const loadData= async ()=>{
        try{
            const responce= await axios.get(`/product/${id}`)
            setProduct(responce?.data?.data)
        }catch(err){
            console.error('Error', err);
        }
    }

    useEffect(()=>{
       loadData();
    },[])

  return (
    <div>
     <Navbar/>
    <div className='main-contanier' >
      <div >
      <img src={product.imgUrl} alt="" className='product-buy-img' />
      </div>
      <div>
         <h1>{product.name}</h1>
         <p>{product.description}</p>
         <span><b>Price:</b> ₹{product.price}</span>
      </div>
    </div>
    </div>
  )
}

export default BuyPage
