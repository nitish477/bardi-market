import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import './BuyPage.css'

function BuyPage() {
  const [product, setProduct] = useState({})
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [address, setAddress] = useState('')
  const [deleveryCharges, setDeleveryCharges] = useState(50)


  const loadData = async () => {
    try {
      const responce = await axios.get(`/product/${id}`)
      setProduct(responce?.data?.data)
    } catch (err) {
      console.error('Error', err);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const decrement = () => {
    if (quantity === 1) {
      return
    }

    setQuantity(quantity - 1)
  }
  const increment = () => {
    setQuantity(quantity + 1)
  }

 
 

 
  const orderNow = async () => {
    const getuser = JSON.parse(localStorage.getItem('user' || '{}'))

    if(!getuser?._id){
      window.location.href='/login'
      alert('Login First')
    }
    const placeOrder = {
      User: getuser?._id,
      Product: id,
      quantity: quantity,
      shippingAddress: address,
      deliveryCharges: deleveryCharges,
    }
    const responce= axios.post('/order',placeOrder)
    alert(responce?.data?.message)
    window.location.href=('/order')
    

  }

  return (
    <div>
      <Navbar />
      <div className='main-contanier' >
        <div >
          <img src={product.imgUrl} alt="" className='product-buy-img' />
        </div>
        <div>
          <h1 className='buy-product-name'>{product.name}</h1>
          <p className='buy-product-description'>{product.description}</p>
          <p className='product-price'><b>Price:</b> ₹{product.price}</p>

          <button className='btn-quantity' onClick={decrement}>➖</button> <span>{quantity}</span> <button className='btn-quantity' onClick={increment}>➕</button>
          <div className='delevery-charges'>

            <input type="radio"
              value={50}
              onChange={(e) => {
                if (e.target.checked) {
                  setDeleveryCharges(e.target.value)
                }
              }}
              name='charges'
            />Starndard Delevery
            <input type="radio"
              value={100}
              onChange={(e) => {
                if (e.target.checked) {
                  setDeleveryCharges(e.target.value)
                }
              }}
              name='charges'
            /> Fast Delevery
          </div>
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='address' className='label'>Address</label>
        <input type="address"
          name='address'
          id='address'
          placeholder='Enter ShippingAddress'
          className='input-address'
          value={address}
          onChange={(e) => { setAddress(e.target.value) }}
        />
      </div>
      <button className='btn buynow' onClick={orderNow} type='button'>Buy Now</button>
    </div> 
  )
}

export default BuyPage
