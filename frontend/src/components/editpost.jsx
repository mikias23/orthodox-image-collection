import React from 'react'
import { useState, Fragment , useEffect} from 'react'
import { toast , ToastContainer} from 'react-toastify'
import { useSelector, useDispatch,} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editImage} from '../features/upload/imageSlice'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
const Editpost = ({picture, editResponse}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {  message, isSuccess} = useSelector(
        (state) => state.image
      )
    
      
    const [formData, setFormData] = useState({
        name:picture.name,
        imageType:picture.imageType,
        location:picture.location,
        city:picture.city,
        description:picture.description
      })
      const  {  
      name,
      imageType,
      location,
      city, 
      description
    } = formData
    const onChange  = (e) => {
        setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
        }))
       }
 
       const onSubmit =  (e) => {
         e.preventDefault()
        
         if( !name || !imageType || !description)
         {
           toast.error('Fill all fields')
         }
         
         else {
      

           dispatch(editImage({data:formData, id: picture._id}));
           editResponse(formData)
        
         }
         
 
       }

     
  return (
    <Fragment>
    
    <Dialog open >
      <DialogHeader>Edit Image</DialogHeader>
      <DialogBody divider>
      <div className='w-full-lg flex flex-col items-center'>
        <ToastContainer />
    <form className="w-full max-w-lg flex flex-col "  onSubmit={onSubmit}>

  <div className="flex flex-col -mx-3 mb-6 items-start">
  <div class="w-full  px-3 mb-6 md:mb-0">
      <label class=" max-w-fit  block camelcase  text-gray-700 text-xs font-bold mb-2 items-start" for="grid-state">
        Image Type
      </label>
      <div class="relative">
        <select class="block appearance-none w-full  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"    
            placeholder = 'Choose the type of the picture you are going to upload '
            onChange={onChange} name='imageType' value = {imageType}>
          <option selected="">God</option>
          <option>Saint Mary </option>
          <option>Angels</option>
          <option>Saints</option>
          <option>Martyr</option>
          <option>Church</option>
          <option>Monks</option>

        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
 </div>
 {imageType == 'Church' ? (
   <div className="w-full px-3 mb-6 md:mb-0">
   <label className="block max-w-fit  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
       City
   </label>
   <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  value={city} name="city"
         placeholder = 'Enter the city where the church is located (optional)'
         onChange={onChange} />
 </div>
 ):(<></>)}
  <div className="flex flex-col -mx-3 mb-6 items-center">

      

    <div className="w-full  items-start px-3 my-3">
      <label className="block items-start uppercase max-w-fit tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name ">
      Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  value={name}
            placeholder = 'Enter name of the image'
            onChange={onChange} name='name' />
    </div>
    <div className="w-full  items-start px-3 my-3">
      <label className="block max-w-fit uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name ">
      Edit Description
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  value={description}
            placeholder = 'Enter Image Description (if any)'
            onChange={onChange} name='description' />
    </div>

    <button type="submit"  disabled = {  !name || !imageType } class=" my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Submit
</button>
  </div>


</form>
    </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
           onClick={() => editResponse(false)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
       
      </DialogFooter>
    </Dialog>
  </Fragment>
  
  )
}

export default Editpost