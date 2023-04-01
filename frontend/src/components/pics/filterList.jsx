import React from 'react'
import { FaTimes } from 'react-icons/fa'
const filterList = ({filterValue, filterKey , closeThisFilter}) => {

  

  return (
    <div className='flex text-white  bg-black p-1 rounded-xl bg-opacity-50 backdrop-filter backdrop-blur-lg flex-wrap gap-2 items-center w-fit' > 
    <p className=' bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg  p-1 rounded-md  '>
    {filterValue} </p> 
    {filterValue !== 'Descending' ? 
      <p className='text-md text-red-800 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg  p-1 rounded-full  hover:scale-125 cursor-pointer pointer-curosr' onClick={ () => { closeThisFilter(filterKey) }} >
    <FaTimes   className="text-red" /> </p>  : <></> }
  
 
    </div>
  )
}

export default filterList