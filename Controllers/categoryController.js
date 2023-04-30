const express = require('express');
const category = require('../Models/CategoryModel');


//Post to create a category
const createCategory = (req, res) => {

    const nCategory = new category.model(req.body);
    nCategory.save((error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json(nCategory);
    });
};



//Get all category 
const getAllcategory = (req, res) => {
    category.model.find({}, (error, nCategory) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(nCategory);
    });
};

//Get one category by id
const getCategoryById = (req, res) => {
    category.model.findById(req.params.id, (error, nCategory) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!nCategory) {
            return res.status(404).send('category not found');
        }
        res.status(200).json(nCategory);
    });
};


//update category information
const updateCategory = (req, res) => {
    category.model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, nCategory) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!nCategory) {
            return res.status(404).send('category not found');
        }
        res.status(200).json(nCategory);
    });
};

//delete category
const deleteCategory = (req, res) => {
    category.model.findByIdAndRemove(req.params.id, (error, nCategory) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!nCategory) {
            return res.status(404).send('category not found');
        }
        res.status(200).send('category deleted successfully');
    });
};


module.exports = {createCategory, getAllcategory, getCategoryById, updateCategory, deleteCategory};