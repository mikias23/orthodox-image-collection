import React from 'react';
import {FaSignInAlt,FaSignOutAlt ,FaUser, FaImages} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {logout, reset} from '../features/auth/authSlice'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message} = useSelector(
      (state) => state.auth
    )
  
    const onLogOut = () => {
        dispatch(logout())
        dispatch(reset())
    }
    
  return (
    
   <header className='header'>
         <div className='logo'>
            <Link to='/'>
                Home
            </Link>
             </div>
             <ul>
                {user ? (
                    <>
                <li>
                    <button className='btn btn-block py-14' type='button' onClick={onLogOut}>
                        <FaSignOutAlt /> Log Out
                    </button>
                </li>
                <li>
                <Link to ="/upload">
                                    <FaImages
                                     /> Upload Images
                                </Link>
            </li>
            </>
    
       ) : (<>
       <li>
                          <Link to ="/login">
                                    <FaSignInAlt /> Login
                                </Link>
                            </li>
                            <li>
                                <Link to ="/signup">
                                    <FaUser
                                     /> Sign Up
                                </Link>
                            </li></>)}

             </ul>
    </header>
  )
}

export default Header