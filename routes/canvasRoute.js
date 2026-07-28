
const express = require('express');
const router = express.Router();
const authenticateRoute = require('../middleware/authentication');
const {getCanvases,createCanvas} = require('../controllers/canvasController');

router.get('/list',authenticateRoute,getCanvases);
router.post('/create',authenticateRoute,createCanvas);


module.exports = router;


