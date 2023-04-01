import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import {  reset, getImage,deleteImage  } from '../features/upload/imageSlice'
import {useState, useEffect } from 'react';

import Pic from './Pic'
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import {FaDownload,FaExpand, FaTimes} from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Pics = ({filterData}) => {
  
  const dispatch = useDispatch()
  var isConfirmed = false, 
  isConfirmationShown = false

  const navigation = useNavigate();
  const [isFull, setIsFull] = useState(false);
  var displayImages = []
  const [imagePathFull, setImagePathFull] = useState('');
  const handle = useFullScreenHandle();
  const toggleFullScreen = (imagePath) => {
    setImagePathFull(imagePath);

    if(isFull){
      setImagePathFull('')
      setIsFull(!isFull);
      return;
    }
    setIsFull(!isFull);
      

    handle.enter(isFull);
  };

    const { uploadedImages, isSuccess, message} = useSelector(
      (state) => state.image);

  


    useEffect(() => {
    if(!uploadedImages )
    {
      dispatch(getImage())

    }
 
  if(message.message === 'success delete')
  {
   displayImages= uploadedImages.filter(image => image._id !== message) ;
   toast.success('Deleted Successfully', {
    position: toast.POSITION.TOP_RIGHT
  });
  }
    return () => {
      dispatch(reset())
    }


 }, [message])
   
 const DeleteImage = (data) =>{

  dispatch(deleteImage(data))
 }
 if(uploadedImages)
 {
   displayImages = uploadedImages.map((item) => {
     if (item.createdAt) {
       return { ...item, createdAt: new Date(item.createdAt) };
     }
     return item;
   });;
     
   Object.keys(filterData).map((key) => {
    
     if(filterData[key] !== '' )
     {
      
       if(key === 'createdAt')
       {
         if(filterData[key] == 'Ascending')
         {
           displayImages.sort((a, b) =>  a.createdAt - b.createdAt);


         }
         else if(filterData[key] == 'Descending'){
           displayImages.sort((a, b) =>  b.createdAt - a.createdAt);
}
    
       }
       else {
         if( (key == 'imageType' || key == 'name')  &&  filterData[key] !== 'All' )
         {
         displayImages = uploadedImages.filter(image => image[key] == filterData[key]);
         
         }
    


       }
     }
    
   });
 }

  
  return (
    
    <>
    
    <ToastContainer/>
    {isFull ? ( <FullScreen handle={handle}>
      <div className="relative  w-100 h-100 p-3 ">
      <img src={imagePathFull} alt="g" width={"100%"} />
      <div onClick={toggleFullScreen} className="absolute group/item   right-0 top-0 cursor-pointer ">
      <span class="text-xs p-2 mb-2 group/edit invisible items-center hover:bg-slate-200 group-hover/item:visible ..." >Close</span>
   <button className="rounder-lg   bg-white text-red-900 p-1 rounded hover:text-black">       <FaTimes className='  ' /> 
</button>
 
      </div>
     
      </div>

   </FullScreen>) :(<>  { displayImages.length !== 0  ? ( <div className='flex flex-wrap gap-2' >
      {displayImages.map((upload) => (
           <Pic picture = { upload }   DeleteImage={DeleteImage}/>
     
        ))
        }
        
    </div>) : (<></>)}
    </>)}
    </>
  )
}

export default Pics