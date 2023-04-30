const express = require('express');
const router = express.Router();
const {checkAuth} = require('../Middleware/auth')
const {createNewSource, getAllNewsSource, getNewSourceById, updateNewSource, deleteNewSource} = require('../Controllers/newsSourceController')


//Create a newsSource
router.post('/newsSource', createNewSource);

//get all newsSource
router.get('/newsSource',checkAuth,getAllNewsSource);

//get newsSource by ID
router.get('/newsSource/:id', getNewSourceById);

//update newsSource
router.put('/newsSource/:id', checkAuth, updateNewSource);

//delete newsSource
router.delete('/newsSource/:id', checkAuth,deleteNewSource);


module.exports = router