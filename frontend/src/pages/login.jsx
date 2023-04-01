import React from 'react';

import {useState, useEffect } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset, phone, changepassword } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Authentication from '../components/authentication'
function Login() {

  const [phoneuser, setPhone] =  useState('')
  const [formData, setFormData] = useState({
    password:''
  })
  const {password} = formData

  
  const onChange  = (e) => {
   setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
   }))
  }

 
   const navigate = useNavigate()
   
   const dispatch = useDispatch()
 
   const { user, isLoading, isError, isSuccess, message, phones} = useSelector(
     (state) => state.auth
   )

 const formDataFunc = (formData) => {
        
  dispatch(changepassword(formData))
 }
   useEffect(() => {
      if(isError)
      {
       toast.error(message)
      }
      if(isSuccess || user)
      {
       navigate('/')
      }
       if(phones !== '')
         setPhone(phones)
      dispatch(reset())
   }, [user, isError, isSuccess, message, navigate, phones])
 


   const getPhone = () =>{
         dispatch(phone())

   }
   const submitLogin =  (e) => {
     e.preventDefault()

       const userData = {
         password
       }
       dispatch(login(userData))
     
   }

 
  //  if(isLoading)
  //  {
  //    return <Spinner />
  //  }

  return (
    <>
   {
        phoneuser == '' ?   
        <>  <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>For Admin Only</p>
          </section>
    
          <section className="form">
             <form onSubmit={submitLogin}>
    
    
              <div className="form-group">
                <input type="password" className="form-control" 
                id="password" name='password' value={password}
                placeholder = 'Enter your password'
                onChange={onChange}
                />
     </div>
              <div className='form-group'>
               <button className='btn btn-block text-teal-500' type='submit' >
                Login</button>
                
              </div>
              <div className='form-group'>
               <button className='btn btn-block text-teal-500' onClick={getPhone} >
                Forgot Password</button>
                
              </div>
             </form>
          </section></>  : 
          <>
                    
        <Authentication phoneuser = { phoneuser}  formDataFunc = { formDataFunc}/></>

      }
    


    </>
  )
}

export default Login
