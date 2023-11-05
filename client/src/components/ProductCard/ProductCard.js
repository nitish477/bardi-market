import React from 'react'
import './ProductCard.css'

function ProductCard( {name,imgUrl,price}) {
  return (
    <>
       <div className='product-card'>
         <img src={imgUrl} alt=""  className='product-img'/>
         <p className='product-name'>{name}</p>
         <h3 className='product-price'>₹{price}</h3>
         <button type='button' className='btn product-btn'>Buy Now</button>
       </div>
    </>
  )
}

export default ProductCard
