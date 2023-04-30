const express = require('express');
const router = express.Router();
const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require('../Controllers/userController')


//Create a user
router.post('/users', createUser);

//get all users
router.get('/users', getAllUser);

//get user by ID
router.get('/users/:id', getUserById);

//update user
router.put('/users/:id', updateUser);

//delete user
router.delete('/users/:id', deleteUser);


module.exports = router