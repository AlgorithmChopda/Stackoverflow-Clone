import './Navbar.css'
import React from 'react'
import logo from '../../assests/logo.png'
import search from '../../assests/search-solid.svg'
import Avatar from '../Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'

import decode from 'jwt-decode'
import { useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const Navbar = () => {

  const dispatch = useDispatch()
  var User = useSelector((state) => (state.currentUserReducer))

  const navigate = useNavigate();

  useEffect(() => {

    const token = User?.token 
    if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp * 1000 < new Date().getTime())
            handleLogout()
    }

    dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])

  const handleLogout = () => {
        dispatch( {type: 'LOGOUT'} )
        navigate('/')
        dispatch(setCurrentUser(null))     
  }


  return (
    <nav className='main-nav'>
    <div className='navbar'>
        <Link to = '/' className  = 'nav-item nav-btn'>
            <img src = {logo} alt = 'logo' />
        </Link>
        <Link to = '/' className  = 'nav-item nav-btn'> About </Link>
        <Link to = '/' className  = 'nav-item nav-btn'> Product </Link>
        <Link to = '/' className  = 'nav-item nav-btn'> For Team</Link>
        <form>
            <input type='text' placeholder='Search....'></input>
            <img src = {search} alt='Search Icon' width = '18' className='search-icon'/>
        </form>

        { 
            User === null ? 
            <Link to='/Auth' className='nav-item nav-links'>Log in</Link> 
                :  
            <>
                <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white' > <Link to= {`/Users/${User?.result._id}` } style= { {color: 'white', textDecoration: 'none'} } > {User.result.name.charAt(0).toUpperCase() } </Link> </Avatar>
                <button className='nav-item nav-links' onClick={handleLogout} > Log out </button>
            </>
        }  

    </div>
</nav>
    )
}

export default Navbar