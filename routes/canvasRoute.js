
const express = require('express');
const router = express.Router();
const authenticateRoute = require('../middleware/authentication');
const {getCanvases,createCanvas,loadCanvas,updateCanvas} = require('../controllers/canvasController');

router.get('/list',authenticateRoute,getCanvases);
router.post('/create',authenticateRoute,createCanvas);
router.get('/load/:id',authenticateRoute,loadCanvas)
router.put('/update/:id',authenticateRoute,updateCanvas)


module.exports = router;


