import UploadForm from '../components/uploadForm'
import {useState, useEffect} from  'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Upload() {

  const { user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()


  useEffect(() => {
    if(!user)
    {
      navigate('/')
    }
 
  }, [user]);
  return (
 

    <div>
        
    <UploadForm />
    </div>
  )
}
