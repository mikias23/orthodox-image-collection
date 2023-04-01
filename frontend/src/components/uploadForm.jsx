import React from 'react'
import {useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FaImages} from 'react-icons/fa'
import { toast , ToastContainer} from 'react-toastify'
import { upload, reset ,} from '../features/upload/imageSlice'
import {FaTimes, FaMapMarked} from 'react-icons/fa'

const max_count = 5;
function UploadForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const  [viewMap, setViewMap] = useState(false);
  const [formData, setFormData] = useState({
        name:'',
        imageType:'God',
        location:'',
        city:'',
        description:''
      })
const [just, setJust] = useState();
    const [uploadedFile, setuploadedFile] = useState(null);
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
        const realFormData = new FormData();
        if(!uploadedFile || !name || !imageType || !description)
        {
          toast.error('Fill all fields')
        }
        
        else {
          Object.keys(formData).map(i =>realFormData.append(`${i}`, formData[i])
          );
          uploadedFile.map(image => 
            realFormData.append("images", image)
          );
           dispatch(upload(realFormData));
        }
        

      }
  
     const { uploadedImages, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.image
  )

  

  const setImage = (e) =>{
    const chosenFiles = Array.prototype.slice.call(e.target.files)
     handleUploadedFiles(chosenFiles) 
  }

  const uploads = [ ]
  const handleUploadedFiles = files => {
    let limitExceeded = false;
    files.some((file) => {
      if(uploads.findIndex((f) => f.name === file.name) === -1)
      {
        uploads.push(file)
      
        if(uploads.length > max_count)
        {

          alert("you can only add a maximum of 5 files");
          limitExceeded = true;
          return true
        }
      }

    })

    if(!limitExceeded)
    setuploadedFile(uploads)
  }

  
  

  useEffect(() => {

    // to re render the component so us to reflect the reset update by homepage
  // the main issue before the cleanup function finish updating the 
    if(just == null)
    {
      setJust(false)
      return;

    }

   
    if(isSuccess)
    {
      navigate('/')
    
    }
    return () => {
      dispatch(reset())
    }

 }, [isSuccess, just,  isLoading])

  return (
   <div className='w-full-lg flex flex-col items-center'>
      <ToastContainer/>

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
<div>             <button type="button" className="rounder-lg   bg-white text-red-900 p-1 rounded hover:text-black" onClick={() => setViewMap(!viewMap)}>Add Location </button>
</div>   
</div>
):(<></>)}
<div className="flex flex-col -mx-3 mb-6 items-center">
<div className="w-full  px-3 mb-6 md:mb-0">
  <div className="flex flex-wrap items-center w-full ">
  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
    Upload Images 
  </label>
  <h1 className="text-3xl "> <FaImages /></h1>
  </div>

  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="file" multiple
      onChange={setImage} placeholder="Image" name='uploadedFile' />
</div>
  
 <div className="flex items-center">
 {uploadedFile != null ? (<div className="h-92 relative w-full max-w-full flex flex-wrap gap-1 ">
  {uploadedFile.map((file, index) => {
    
   return <div className='h-32  w-32'> <img src={URL.createObjectURL(file)} className="h-full w-full"
alt="..." />
</div>
     
  })}
 

</div>):(<>

 </>)}

 </div>
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
  Enter something that describes the image 
  </label>
  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  value={description}
        placeholder = 'Enter Image Description (if any)'
        onChange={onChange} name='description' />
</div>

<button type="submit"  disabled = {  !name || !uploadedFile  } class=" my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
Submit
</button>
</div>


</form>
</div>
    
   
  
  )
}

export default UploadForm
