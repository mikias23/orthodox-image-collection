const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 5000



const {errorHandler } = require('./middleware/errorMiddleware')

const connectDB = require("./config/db");


connectDB();

app.use(express.json())
app.use(express.urlencoded({ extened: false }));
app.use("/images", express.static((path.join(__dirname, 'images')))); 

app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use(errorHandler)
app.listen(port, () => console.log(`server started on port ${port}`))
