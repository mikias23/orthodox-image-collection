import React from 'react'
import { useState } from 'react'
import OTPInput from "otp-input-react";
import {CgSpinner} from "react-icons/cg"
import {auth } from '../firebase.config.ts'
import {  RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";
import { toast, Toaster } from 'react-hot-toast';
import { async } from '@firebase/util';

const Authentication = ({phoneuser, formDataFunc}) => {
    const [loading, setLoading] = useState(false)
    const [codeSent, setCodeSent] = useState(false)
    const [otp, setOtp ] = useState('')
    const [confirmed, setConfirm] = useState(false)
  
    const confirmCode = () => {
        setLoading(true)
        window.confirmationResult.confirm(otp).then(async(res => console.log(res.user))).catch(error=> console.log(error))
        setConfirm(true)
    }
    const onSubmit =(e) => {
        e.preventDefault()
        const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
   const isValidPassword = regex.test(password);
   if (isValidPassword) {
    console.log(password, confirmPassword)
        if(password !== confirmPassword )
        toast.error('Password no Match')
        else {
       formDataFunc({password:password})    
        }
      
   }
   else {
    toast.error('password must include atleast one character and length of 8 characters and digit')

   }
    }
    const [formData, setFormData] = useState({
      password:'', 
      confirmPassword:''
      })
      const {password, confirmPassword} =formData
    const onChange  = (e) => {
        setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
        }))
       }
 

       
       function onCaptchVerify () {
        if(!window.recaptchaVerifier)
        {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
        sendCode()
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
            }, auth)
        }
    }

    function sendCode( )
    {
        let phone = phoneuser.replace("0", "+251")
        setLoading(true);
         onCaptchVerify()  
const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,phone, appVerifier)
    .then((confirmationResult) => {
      setLoading(false)
       setCodeSent(true) 
      toast.success('OTP sent successfully')
      window.confirmationResult = confirmationResult;

    }).catch((error) => {
        console.log(error)
      setLoading(false)
    });
    }
  return (
<>
          <div id="recaptcha-container"></div>
          <Toaster  toastOptions={{ duration:4000 }}/>


    {
       confirmed ? <>
       <form className="w-full max-w-lg flex flex-col items-center m-auto "  onSubmit={onSubmit}>
        <h1 className='mt-1 shadow-lg text-cyan-900'>Create New Password</h1>
<div className="w-full  items-start px-3 my-3">
  <label className="block items-start uppercase max-w-fit tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name ">
  Password
  </label>
  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password"  value={password}
        placeholder = 'Enter password'
        onChange={onChange} name='password' />
</div>
<div className="w-full  items-start px-3 my-3">
  <label className="block items-start uppercase max-w-fit tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name ">
  Confirm Password
  </label>
  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password"  value={confirmPassword}
        placeholder = 'Confirm password'
        onChange={onChange} name='confirmPassword' />
</div>
<button className='btn btn-sm-block mt-3' type='submit'>Submit</button>
   
   
    </form> </>:
       <>
       <h1 className='text-center text-xl underline'> Password Recovery Page</h1>
       {
          codeSent ?
          <>
                <p className='my-2 bg-blue-gray-200/20'>Enter otp code here 
                </p>
                <div className='bg-cyan-800/30 px-2 py-5'>
                <OTPInput value = {otp} onChange= {setOtp} OTPLength ={6} otpType = "number" disabled= {false} autoFocus className="opt-container "  >  </OTPInput> 
                <button className='btn btn-sm-block mt-3 mx-auto' onClick={confirmCode}> 
                {loading ? <CgSpinner className='mt-1 animate-spin'   size={20}/> : <></>}
                Confirm </button>
   
                </div>
        </>:  <div className='shadow-lg p-4 flex flex-col items-center justify-center'>
   
               
          <p className='my-2'> Verification code will be sent to this phone: <span className='text-lg text-cyan-900'>{phoneuser}</span> 
          </p>
          <button className='btn btn-sm-block mt-3' onClick={sendCode}> Send Code </button>
            
       
      </div>
       }
       </>
    }

</>
  )
}

export default  Authentication
