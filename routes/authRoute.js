
const express = require('express');
const {register,login,profile} = require('../controllers/authController');
const {validateRegister} = require('../middleware/validation')
const router = express.Router();

router.post('/register',validateRegister,register);

router.post('/login',login);
router.get('/profile',profile);

module.exports = router;