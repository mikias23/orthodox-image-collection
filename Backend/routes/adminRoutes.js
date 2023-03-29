const express = require('express')
const router = express.Router()
const {  signUp, logIn, upload} = require('../controllers/adminController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(signUp)
router.route('/login').post(logIn)
router.get('/upload',protect, upload)
module.exports = router

