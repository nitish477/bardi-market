import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import ProductCard from '../../components/ProductCard/ProductCard'
function Home() {
  const [product,setProduct]=useState([])
  const [search,setSearch]=useState('')

 const loadSearch= async ()=>{
  if(search===''){
    getProducts();
    return
  }
  try{
    const responce = await axios.get(`/product/search?q=${search}`)
    setProduct(responce?.data?.data)
  }catch(err){
    console.log(err)
  }
 }

 useEffect(()=>{
   loadSearch();
 },[search])



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
      <input type="text" 
          className='search-box'
          placeholder='Search...' 
          value={search}
          onChange={e => setSearch(e.target.value)} />
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
