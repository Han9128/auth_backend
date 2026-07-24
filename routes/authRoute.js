
const express = require('express');
const {register,login} = require('../controllers/authController');
const {validateRegister} = require('../middleware/validation')
const router = express.Router();

router.post('/register',validateRegister,register);

router.post('/login',login);

module.exports = router;