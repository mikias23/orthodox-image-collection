import React, {useRef} from 'react'
import {useState, useEffect } from 'react'
import Trial from './trial'
import Pics from './Pics'
import Pagefirst from './pagefirst';
import FilterList from './pics/filterList'

const Filter = () => {
  const sectionRef = useRef(null);
  const handleClick = () => sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    const [filterData, setFilterData] = useState({
        name:'',
        imageType:'',
        location:'',
        city:'',
        createdAt:'Descending'
      })
      const  {  
        name,
        imageType,
        location,
        city, 
        createdAt
      } = filterData
      
     
      const onChange  = (e) => {
       
        setFilterData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
        }))
      
       }
 
   const filterName = (filterName) => 
   {
    setFilterData((prevState) => ({
    ...prevState, name:filterName
   })
  )
   handleClick()

   }
   function closeThisFilter(key)
   {
   if(key == 'createdAt' && key == 'Ascending' )
   {
   }
   else {
    setFilterData((prevState) => ({
      ...prevState,[key]:''
     }))  
   }


   }
  return (
    <div className='flex flex-col'>
     <Pagefirst filterName= {filterName} />
    <div className='flex items-start flex-wrap gap-2 p-2 rounded-sm  z-50 h-2"'>
 <div className="flex flex-col -mx-3  items-start">

  <div class="w-full  px-3  md:mb-0">
      <label class=" max-w-fit  block camelcase  text-gray-700 text-xs font-bold mb-2 items-start" for="grid-state">
        Image Type
      </label>
      <div class="relative">
        <select class="block appearance-none w-full  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"    value={imageType}
            placeholder = 'Choose the type of the picture you are going to upload '
            onChange={onChange} name='imageType'>
           <option  selected >All</option>
          <option >God</option>
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
 <div className="flex flex-col -mx-3  items-start">
  <div class="w-full  px-3  md:mb-0">
      <label class=" max-w-fit  block camelcase  text-gray-700 text-xs font-bold mb-2 items-start" for="grid-state">
        Sort By Date
      </label>
      <div class="relative">
        <select class="block appearance-none w-full  bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"    value={createdAt}
            placeholder = 'Choose the type of the picture you are going to upload '
            onChange={onChange} name='createdAt'>
          <option selected="selected">Descending</option>
          <option>Ascending</option>

        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
</div>
 </div>
 <div className=" items-start px-3 ">
      <label className="block items-start uppercase max-w-fit tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name ">
     Search By Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  value={name}
            placeholder = 'Enter name of the image'
            onChange={onChange}
         name='name' />
    </div>

    {imageType == 'Church' ? (
        <>
           <div className=" px-3 ">
   <label className="block max-w-fit  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
       City
   </label>
   <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  value={city} name="city"
         placeholder = 'Enter the city where the church is located (optional)'
         onChange={onChange} />
 </div>
   <div className="px-3  ">
   <label className="block max-w-fit  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
       Location
   </label>
   <input className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  value={location} name="location"
         placeholder = 'Enter the Location of the church.'
         onChange={onChange} />
 </div>
        </>

 ):(<></>)}
       
    </div>
    <div ref={sectionRef}>
    <p className='text-md text-white bg-black bg-opacity-40 text-bold bold mt-2 backdrop-filter backdrop-blur-lg  p-1 rounded-full  hover:scale-125 cursor-pointer pointer-curosr w-fit p-2 m-auto' >Filter Attributes</p>
      <div className='flex flex-wrap gap-2 my-2'>
     

      {filterData ? <>{Object.entries(filterData).map(([key, item])=> (

        filterData[key] !== '' ? <FilterList filterValue = {filterData[key]} filterKey = {key} closeThisFilter = {closeThisFilter}/>: <></>


      ))}</> :<p></p>}
      
            </div>

    <Pics filterData = {filterData}/>
    </div>

  
    </div>

  )
}

export default Filter
