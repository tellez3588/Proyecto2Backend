const express = require('express')
const router = express.Router()

const { loginCtrl, registerCtrl, confirm, confirmPasswordLess } = require('../Controllers/authController')

//user login
router.post('/login', loginCtrl)

//passwordless login
router.get('/login/confirm/:token', confirmPasswordLess)

//user register
router.post('/register', registerCtrl)

//confirm register
router.get('/register/confirm/:token', confirm)





module.exports = router