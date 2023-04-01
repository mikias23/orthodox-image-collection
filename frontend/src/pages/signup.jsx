import {useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { signup, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/spinner'
import React from 'react';

function Signup() {

  const [formData, setFormData] = useState({
    phone:'',
    email:'',
    password:'',
    password1 :''
  })
  const {phone, email, password, password1} = formData

  const onChange  = (e) => {
   setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
   }))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
     if(isError)
     {
      toast.error(message)
     }
     if(isSuccess || user)
     {
      navigate('/')
     }
     dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onSubmit =  (e) => {
    e.preventDefault()
    if(password !== password1)
    {
      toast.error('Passwords do not match ')
    }
    else {
      const userData = {
        email, 
        phone, 
        password
      }
      console.log(userData)
      dispatch(signup(userData))
    }
  }

  // if(isLoading)
  // {
  //   return <Spinner />
  // }
  return (
    <>
      <section className="heading">
    <h1>
      <FaUser />
      Register 
    </h1>
    <p>For Admin Only</p>
      </section>

      <section className="form">
         <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="phone" name ='phone' className="form-control" 
            id="phone" value={phone}
            placeholder = 'Enter your Phone'
            onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input type="email" name="email" className="form-control" 
            id="email" value={email}
            placeholder = 'Enter your email'
            onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input type="password"  name = "password" className="form-control" 
            id="password" value={password}
            placeholder = 'Enter your password'
            onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input type="password" name="password1" className="form-control" 
            id="password1" value={password1}
            placeholder = 'Confirm Password'
            onChange={onChange}
            />
          </div>
          <div className='form-group'>
           <button className='btn btn-block' type='submit' >
            Sign Up 
            </button>
          </div>


         </form>
      </section>
    </>
  )
}

export default Signup
