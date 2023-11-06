import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'

function ProductCard( {name,imgUrl,price,id}) {
  return (
    <>
       <div className='product-card'>
         <img src={imgUrl} alt=""  className='product-img'/>
         <p className='product-name'>{name}</p>
         <h3 className='product-price'>₹{price}</h3>
         <Link to={`/buynow/${id}`} className='btn product-btn' >Buy Now</Link>
       </div>
    </>
  )
}

export default ProductCard
