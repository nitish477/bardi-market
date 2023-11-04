import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


function Navbar() {
  const [user,setUser]=useState({})

  useEffect(()=>{
    const getData=JSON.parse(localStorage.getItem('user')|| '{}')
    setUser(getData)
  },[])

  return (
    <nav className='navbar'>
     <div>
     <Link to={'/'} className='brand'>
        Bardi-Market 🛒🏬
       </Link>
     </div>
     <div>
    {
      !user?.email ?(
        <span>
        <Link to={'/login'} className='nav-list'>
            Login
        </Link>
      </span>
      ) :null
    }
       {
      !user?.email ?(
        <span>
        <Link to={'/signup'} className='nav-list'>
            Signup
        </Link>
      </span>
      ) :null
    }
      <span>
        <Link to={'/order'} className='nav-list'>
            Order 🛒
        </Link>
      </span>
     </div>

    <div>
      Hello, {user?.name}

      {
      user?.name ? (
        <button onClick={()=>{
         const logout=  localStorage.removeItem('user');
         setUser(logout)
         window.location.href='/login'
          
        }} className='btn-logout'>
          <img src="https://cdn-icons-png.flaticon.com/128/2550/2550435.png" alt="" className='logout-img' />
        </button>
      ) :null
    }
    </div>
    

   
    </nav>
  )
}

export default Navbar
