const express = require('express');
const { tokenSign } = require('../helpers/generateToken');
const { encrypt } = require('../helpers/passwordBcrypt');
const user = require('../Models/userModel');


//Post to create a new user
const createUser = async (req, res) => {

    const { email, password, firstName, lastName, phone } = req.body;
    const passwordHash = await encrypt(password)
    const newUser = new user.model({
        email,
        password: passwordHash,
        firstName,
        lastName,
        phone
    });
    const tokenSession = await tokenSign(newUser);
    newUser.save((error) => {
        if (error) {
            return res.status(500).send(error);
        }

        res.status(201).send({
            data: newUser,
            tokenSession           
        }
            
        );
    });
};



//Get all users 
const getAllUser = (req, res) => {
    user.model.find({}, (error, users) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(users);
    });
};

//Get one user by id
const getUserById = (req, res) => {
    user.model.findById(req.params.id, (error, users) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!users) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName
        });
    });
};


//update user information
const updateUser = (req, res) => {
    user.model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, users) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!users) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({
            _id: users._id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName
        });
    });
};

//delete user
const deleteUser = (req, res) => {
    user.model.findByIdAndRemove(req.params.id, (error, users) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!users) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    });
};


module.exports = {createUser, getAllUser, getUserById, updateUser, deleteUser};