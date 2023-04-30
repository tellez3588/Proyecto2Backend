const express = require('express');
const router = express.Router();
const {createNew, getAllNews, getNewById, updateNew, deleteNew} = require('../Controllers/newsController')


//Create a new
router.post('/news/:userId/Process', createNew);

//get all news
router.get('/news', getAllNews);

//get new by ID
router.get('/news/:id', getNewById);

//update new
router.put('/news/:id', updateNew);

//delete new
router.delete('/news/:id', deleteNew);


module.exports = router