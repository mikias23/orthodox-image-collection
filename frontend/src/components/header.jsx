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
                <li className='flex items-center cursor-pointer rounded-md p-2 hover:bg-blue-gray-600 hover:text-white'>
                    <button className='flex '  onClick={onLogOut}>
                        <FaSignOutAlt />
                    </button>
                    <h4>Log Out</h4>
                </li>
                <li >
                <Link to ="/upload" className='flex items-center  border-white cursor-pointer rounded-md p-2 hover: border-black'>
                                    <FaImages
                                     /> 
                                     <h4>Upload Images</h4>
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