const express = require('express')
const router = express.Router()
const { getImages, updateImage, setImage, deleteImage} = require('../controllers/imageController')
const {upload} = require('../helpers/storage')

router.route('/').get(getImages).post(upload.array('images'), setImage)

router.post('/delete', deleteImage)
router.post('/edit', updateImage)


module.exports = router

