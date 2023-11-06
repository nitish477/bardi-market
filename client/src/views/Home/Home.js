import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import ProductCard from '../../components/ProductCard/ProductCard'
function Home() {
  const [product,setProduct]=useState([])
  const getProducts=async ()=>{
    try {
     const responce= await axios.get('/products')
     setProduct(responce?.data?.data)
    }catch(err){
      console.log('error',err.message)
      alert('Error to load')
    }
  }
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <>
      <Navbar/>
      <div className='product-contanier'>
        {
           product?.map((obj,index)=>{
            const {name,imgUrl,price,_id}= obj
            return <ProductCard key={index} name={name} imgUrl={imgUrl} price={price} id={_id} />
           })
        }
      </div>
    </>
  )
}

export default Home
