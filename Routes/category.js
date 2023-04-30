const express = require('express');
const router = express.Router();
const { createCategory, getAllcategory, getCategoryById, updateCategory, deleteCategory } = require('../Controllers/categoryController')
const {checkAuth} = require('../Middleware/auth')

//Create a category
router.post('/category', createCategory);

//get all categories
router.get('/category',checkAuth, getAllcategory);

//get category by ID
router.get('/category/:id', getCategoryById);

//update category
router.put('/category/:id', updateCategory);

//delete category
router.delete('/category/:id', deleteCategory);


module.exports = router