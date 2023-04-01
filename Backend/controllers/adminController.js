const asyncHandler = require('express-async-handler')

const Admin= require('../models/admin')
const fs = require('fs');
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')


const generateToken = (id ) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
} 
const signUp= asyncHandler(async (req, res) => {
    const admin = await Admin.find();
    console.log(admin)
    if(admin.length == 0)
    {

       var result;
       const {phone , password, email } = req.body;
        if(phone && password)
        {
                 const salt = await bcrypt.genSalt(10)
                 const hashedPassword = await bcrypt.hash(password, salt)

                  result  = await Admin.create({
                        phone: phone,
                        password: hashedPassword,
                        email:email

                    })        
                    console.log(result)         
             
            if(result)
            {
                res.json({
                    _id: admin[0]._id,
                    email: admin[0].email,
                    token: generateToken(admin[0]._id)
                })

            }
   
        }
        else {
            res.status(400)
            throw new Error("Enter all fileds")
        }
       

    }

    else {
        res.status(400)
        throw new Error("Admin Exists")
    }
})
const returnAdminPhone = asyncHandler(async(req, res) => {
    const admin = await Admin.find();
    if(admin.length >0)
    {

        res.json({
            message:true,
            phone: admin[0].phone,
        })
    }
    else {
        res.json({
            message:false
        })
    }

}) 
const logIn = asyncHandler(async (req, res) => {
    const password = req.body.password
 
    
       if(password)
       {
        const admin = await Admin.find();
        if(admin.length != 0  && (await bcrypt.compare(password, admin[0].password)))
        {

            res.json({
                id: admin[0]._id,
                email: admin[0].email,
                token: generateToken(admin[0]._id)
            })
         
        }
        else {
            res.status(400)
            throw new Error("Incorrect Password")

        }
       }
       else {
        res.status(400)
        throw new Error("Enter Password")
       }
       


    })
const upload = asyncHandler(async (req,res) => {

    res.status(200).json({
        success: true
    })
})

const changePassword= asyncHandler(async (req, res) => {
    const password = req.body.password
 
    if(password){
        const admin = await Admin.find();
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        if(admin.length !== 0)
        {
            const updatedImage= await Image.findOneAndUpdate(admin[0]._id,hashedPassword,  {
                new:true
            })
            if(updatedImage)
            {
                res.json({
                    id: admin[0]._id,
                    email: admin[0].email,
                    token: generateToken(admin[0]._id)
                })
            }
        }
    }
else {
        res.status(400)
        throw new Error("Password Nor Found")
       }
       


    })
module.exports = {
    signUp, logIn, upload, returnAdminPhone, changePassword
}