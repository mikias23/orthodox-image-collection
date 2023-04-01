import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import {useState, useEffect } from 'react';
import { getImage } from '../features/upload/imageSlice'

 import {CgSpinner} from "react-icons/cg"
 import { FaSearch } from 'react-icons/fa';


const Pagefirst = ({filterName}) => {

     const dispatch = useDispatch()
    var intervalId;
    const [randomNumber, setRandomNumber] = useState(null);
    const [toggleInterval, setToggleInterval] = useState(false)
    var lengthImages
    const { uploadedImages} = useSelector(
        (state) => state.image);
        if(uploadedImages )
        {
          lengthImages = uploadedImages.length
          intervalId = setInterval(() => {
               const number = Math.floor(Math.random() * lengthImages);
               if(randomNumber !== number)
               {
                setRandomNumber(number);

               }
    }, 3000);  
        
        }
       
        useEffect(() => {
          if(!uploadedImages )
            dispatch(getImage()) 
          return () => {
            clearInterval(intervalId);
          };
        })

        const filterByName = (name) => {
          console.log(name)
               filterName(name)
        }
  return (
    <div>
      
        {
            uploadedImages ? (<div className='w-full h-screen relative  '>
              {
                randomNumber !== null ? <div className='relative   before:rounded-3xl before:absolute before:bg-gradient-to-r from-black/0 to-black/80 before:left-0 before:top-0  before:w-full before:h-full  className="w-full h-full rounded-3xl"'>
                  <h3 className="absolute translateY tra text-orange-100  w-1/3 bg-white p-3 rounded-xl bg-opacity-30 backdrop-filter backdrop-blur-lg">{uploadedImages[randomNumber].name}</h3> 

                  <img src={uploadedImages[randomNumber].imagePath[0]} className="w-full h-full rounded-3xl" alt="" />
                  <div className='absolute bottom-40 w-1/2 left-1/2  -translate-x-1/2  '>
                  <h4 className=' text-orange-100   bg-white p-3 rounded-xl bg-opacity-30 backdrop-filter backdrop-blur-lg'>Find more Images of {uploadedImages[randomNumber].name}</h4>
                   <div className="w-full my-2  flex justify-center">
                   <button onClick={() => filterByName(uploadedImages[randomNumber].name)}
  class="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
  data-ripple-light="true"
>
    Search Now <FaSearch/> 
  </button>
                   </div>

  
                  </div>
</div>:    <div className='m-auto'> <h4><CgSpinner className='text-xl mt-1 animate-spin m-auto text-yellow-900'   size={20}/> Processing </h4> 
                  </div>  
                  
                 
              }
          
              
        </div>): null
        }


    </div>
  
  )

}




export default Pagefirst
