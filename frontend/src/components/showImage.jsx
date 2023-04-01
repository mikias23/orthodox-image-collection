import React from 'react'
import { Fragment} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaTimes} from 'react-icons/fa'
const ShowImage = ({sendSrc, ShowImg} ) => {

 
    return (
        <Fragment >

    
          <Dialog open >
          <button className="rounder-lg z-10 absolute right-1 top-1 bg-white text-red-900 p-1 rounded hover:text-black" onClick={ShowImg} ><FaTimes /></button>
            <DialogBody divider>
    <img src={sendSrc} alt="" width={'100%'} height ={'100%'} />
            </DialogBody>

          </Dialog>
        </Fragment>
      );
}

export default ShowImage
