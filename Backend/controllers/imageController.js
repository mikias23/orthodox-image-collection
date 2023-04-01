const asyncHandler = require('express-async-handler')
const {emptyArray,returnImageArray} = require('../helpers/storage')
const Image= require('../models/image')
const fs = require('fs');



const getImages= asyncHandler(async (req, res) => {
    const images = await Image.find();
    res.status(200).json(images)

})

const setImage =  asyncHandler(async (req, res) => {

     var imagePath =  returnImageArray();
      emptyArray()
     const image = await Image.create({
         description: req.body.description ,
         imageType: req.body.imageType,
         name: req.body.name,
         imagePath: imagePath,
         city:req.body.city,
         location:req.body.location }) 

        res.status(200).json(image)
})

const updateImage = asyncHandler(async (req, res) => {

    const image = await Image.findById(
        req.body.id
    )
    if(!image)
    {
        res.status(400)
        throw new Error("Not Found ")
    }
    const updatedImage= await Image.findOneAndUpdate(req.body.id, req.body.data,  {
        new:true
    })
    res.status(200).json({message:'success edit', id: req.body.id})
})

const deleteImage = asyncHandler(async (req, res) => {

    const id =  req.body.id
    const image = await Image.findById(
        id
    )
    if(!image)
    {
        res.status(400)
        throw new Error("Not Found ")

    }

     const imagePath =  image.imagePath;
     await Image.deleteOne({_id:id});

     if(imagePath.length > 0 )
     {
        imagePath.forEach(path => {
            path = path.replace('http://localhost:5000/', 'Backend/')
            fs.unlink(path, (err) => {
              if (err) {
                  throw err;
              }
              });
          })
     }

    res.status(200).json({message:"Success delete", id:id})
})


module.exports = {
    getImages, deleteImage, updateImage, setImage
}