
const express = require('express');
const router = express.Router();
const authenticateRoute = require('../middleware/authentication');
const {getCanvases} = require('../controllers/canvasController');

router.get('/list',authenticateRoute,getCanvases);


module.exports = router;


