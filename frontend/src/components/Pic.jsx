import React from 'react'
import axios from 'axios';
import Confirm from './confirm';
import Editpost from './editpost';
import ShowImage from './showImage';
import {useState, useEffect, fragment } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";



import {FaDownload,FaExpand, FaTimes,FaTrashAlt , FaBookOpen, FaEdit} from 'react-icons/fa'

const Pic = ({picture , DeleteImage}) => {
  const [editOrDelete, setEditOrDelete] = useState(null);
  let content;
  let FaTimesShowOrHide
  const [checked, setChecked] = useState(false);
  const downloadImage = () => {
    const imageUrl = picture.imagePath[0];

    axios.get(imageUrl, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
      });
  }
  const requestToDelete = () => { 

    setEditOrDelete('delete')

  }

  const ShowImg = () => {
    if(editOrDelete == 'showImage')
    {
      setEditOrDelete(null)

    }
    else {
      setEditOrDelete('showImage')

    }

  }

  const EditImage = () => {
    setEditOrDelete('edit')

  }
  const toggleChecked = () => {
    setChecked(!checked) 
  }
  const editResponse = (data) => {

    if(!data)
    {
      setEditOrDelete(null)

    }
    else {


      setEditOrDelete(null);

      Object.keys(data).map((key) => {

        picture[key] = data[key]
      })
      console.log(data)
      
    }
  }
  //
  const response= (confirmed) => {
    console.log(confirmed)
      if(confirmed)
      {
        DeleteImage(picture._id)
      }
     
      setEditOrDelete(null)

  }
  const closeImage = () => {

  }

  if(checked)
  {
    FaTimesShowOrHide =  
    <>
    <h1 class="text-yellow-900 p-1 border-b border-white">Description</h1>       
    <button className="rounder-lg  absolute right-1 top-1 bg-white text-red-900 p-1 rounded hover:text-black" onClick={ toggleChecked}><FaTimes /></button>
    </>  
  
  }
  else {
    FaTimesShowOrHide = <></>
  }
  
  switch (editOrDelete) {
    case 'delete':
      content = <div>    <Confirm   response = { response} /> </div>;
      break;
    case 'edit':
      content = <div className='h-screen w-screen'> <Editpost picture={picture} editResponse = {editResponse}/> </div>;
      break;
    case 'showImage':
      let imageSrc = picture.imagePath[0]
      content = <ShowImage sendSrc = {imageSrc} ShowImg={ShowImg} />
      break;
    default:
      content =  <Card
      shadow={false}
      className="z-0  box-border relative flex flex-col  items-center  h-[20rem] w-full max-w-[16rem] "
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        
        className="absolute inset-0 m-0 h-full w-full rounder-medium bg-cover bg-center"
      >
        <img src={ picture.imagePath[0]} className="h-full w-full"
  alt="..." />
  
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative w-full h-full ">
        <Typography
          variant="h6"
          className="p-0 text-lg font-normal blur-bg-md border border-white font-mono antialiased bg-opacity-30 text-white bg-black px-2 py-1 rounded-md my-2"
        >
         {picture.name} 
        </Typography>
        <Typography  className="mb-1 text-md font-light text-white mt-2 bg-opacity-30  bg-white my-2">
        
        {picture.imageType}
        </Typography>
        <Typography variant="small"  color="yellow" className="text-center">
          <div  className={checked ? 'absolute w-full h-full left-0 top-0 bg-black text-white text-sm bg-opacity-80 p-1 rounded-md bg-black' : 'w-1/2 m-auto truncate text-white text-sm bg-opacity-30 p-1 rounded-md bg-black'}> 
          { FaTimesShowOrHide}
           <p>{picture.description}</p>
            
            </div>
          <button className="rounder-lg mt-2" onClick={ toggleChecked}><FaBookOpen /></button>

     
        </Typography>
        <Typography className=" cursor-pointer flex flex-col items-center mt-2 w-full  justify-center mb-2 text-gray-400">
     
  
     <div className="flex justify-center my-2 w-full ">
       
       <div  className="flex flex-col w-1/2 text-center items-center justify-center gap-2 group/item hover:bg-slate-100 ... p-0 ">
            <button onClick={() => ShowImg()}
  
            >      
              <FaExpand className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> 
  </button>
          <span class="text-small group/edit invisible text-xs items-center hover:bg-slate-200 group-hover/item:visible ..." >Expand</span>
          </div>
        
       <div className="flex flex-col w-1/2 text-center items-center justify-center gap-2 group/item hover:bg-slate-100 ... p-0">
          <button onClick={downloadImage}>   <FaDownload className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> </button>
          <span class="group/edit invisible text-xs hover:bg-slate-200 group-hover/item:visible ...">Download</span>
          </div>
       </div>
          <div className="flex justify-center mt-2 w-full ">
       <div  className="flex flex-col text-center w-1/2 items-center justify-center gap-2 group/item hover:bg-slate-100 ... p-0">
            <button onClick={() => EditImage()}
  
            >      
              <FaEdit className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> 
  </button>
          <span class="group/edit invisible text-xs hover:bg-slate-200 group-hover/item:visible ..." >Edit </span>
          </div>
        
       <div className="flex flex-col text-center w-1/2 items-center justify-center gap-2 group/item hover:bg-slate-100 ... p-0">
          <button onClick={() => requestToDelete()}>   <FaTrashAlt className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> </button>
          <span class="group/edit invisible text-xs hover:bg-slate-200 group-hover/item:visible ...">Delete </span>
          </div>
       </div>
      
        </Typography>
      
  
      </CardBody>
  
  
    </Card>;
      break;
  }
  return (
    <>
{content}

  </>
  
    
  )
}

export default Pic