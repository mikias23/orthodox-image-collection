import React from 'react'
import axios from 'axios';
import Confirm from './confirm';
import Editpost from './editpost';

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

const Pic = ({picture , toggleFullScreen, DeleteImage}) => {
  const [editOrDelete, setEditOrDelete] = useState(null);
  let content;
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
  switch (editOrDelete) {
    case 'delete':
      content = <div>    <Confirm   response = { response} /> </div>;
      break;
    case 'edit':
      content = <div className='h-screen w-screen'> <Editpost picture={picture} editResponse = {editResponse}/> </div>;
      break;
    default:
      content =  <Card
      shadow={false}
      className="z-0 p-10 box-border relative flex flex-col  items-center justify-end h-[20rem] w-full max-w-[16rem] "
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
      <CardBody className="relative ">
        <Typography
          variant="h6"
          className="p-0 font-normal blur-bg-md border border-white font-mono antialiased bg-opacity-30 text-white bg-black px-2 py-1 rounded-md"
        >
         {picture.name} 
        </Typography>
        <Typography  className="mb-1 text-md font-light text-black mt-2 bg-white">
        
        {picture.imageType} 
        </Typography>
        <Typography variant="small"  color="yellow" className="text-center">
          <div  className={checked ? 'absolute w-full h-full left-0 top-0 bg-black text-white text-sm bg-opacity-90 p-1 rounded-md bg-black' : 'w-1/2 m-auto truncate text-white text-sm bg-opacity-30 p-1 rounded-md bg-black'}>  <p>{picture.description}</p>
          <div>
          {
            checked ? (<button className="rounder-lg  absolute right-1 top-1 bg-white text-red-900 p-1 rounded hover:text-black" onClick={ toggleChecked}><FaTimes /></button>) : (<h1> </h1>)}
          </div>
            </div>
          <button className="rounder-lg" onClick={ toggleChecked}><FaBookOpen /></button>

     
        </Typography>
        <Typography className=" cursor-pointer flex flex-col align-items-center mt-2 w-full  justify-items-center mb-2 text-gray-400">
     
  
     <div className="flex justify-items-center ">
       
       <div  className="flex flex-col text-center items-center gap-2 group/item hover:bg-slate-100 ... p-0">
            <button onClick={() => toggleFullScreen(picture.imagePath[0])}
  
            >      
              <FaExpand className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> 
  </button>
          <span class="text-small group/edit invisible text-xs items-center hover:bg-slate-200 group-hover/item:visible ..." >Expand</span>
          </div>
        
       <div className="flex flex-col text-center items-center gap-2 group/item hover:bg-slate-100 ... p-0">
          <button onClick={downloadImage}>   <FaDownload className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> </button>
          <span class="group/edit invisible text-xs hover:bg-slate-200 group-hover/item:visible ...">Download Image</span>
          </div>
       </div>
          <div className="flex justify-items-center ">
       
       <div  className="flex flex-col text-center items-center gap-2 group/item hover:bg-slate-100 ... p-0">
            <button onClick={() => EditImage()}
  
            >      
              <FaEdit className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> 
  </button>
          <span class="text-small group/edit invisible text-xs items-center hover:bg-slate-200 group-hover/item:visible ..." >Edit </span>
          </div>
        
       <div className="flex flex-col text-center items-center gap-2 group/item hover:bg-slate-100 ... p-0">
          <button onClick={() => requestToDelete()}>   <FaTrashAlt className='cursor-pointer group/edit  group-hover/item:text-lime-200' /> </button>
          <span class="group/edit invisible text-xs hover:bg-slate-200 group-hover/item:visible ...">Delete Image</span>
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