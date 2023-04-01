import React from 'react'
import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Confirm = ({ response}) => {


 

    return (
        <Fragment>
    
          <Dialog open >
            <DialogHeader>Confirmation Dialogue</DialogHeader>
            <DialogBody divider>
Are You sure you want to complete this action ?
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                 onClick={() => response(false)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green"
                               onClick={() => response(true)}
                               >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
      );
}

export default Confirm
