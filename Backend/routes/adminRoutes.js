const express = require('express')
const router = express.Router()
const {  signUp, logIn, upload, returnAdminPhone, changePassword} = require('../controllers/adminController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(signUp)
router.route('/login').post(logIn)
router.get('/upload',protect, upload)
router.get('/phone', returnAdminPhone )
router.post('/changePassword',changePassword)
module.exports = router

