const express = require('express');
const { parse } = require('../Helpers/process')
const news = require('../Models/newsModel');
const newsSource = require('../Models/newsSourceModel');

//Post to create a news
const createNew = async (req, res) => {

    const userId = req.params.userId
    const newsD = await news.model.deleteMany({ userId: userId });
    newsSource.model.find({}, (error, source) => {
        
        source.forEach(element => {
            if(element.userId === userId){
                parse(element.rssUrl, element.category,element._id, element.userId)
            }
        });
        res.send('successfully');
    });

};



//Get all news 
const getAllNews = (req, res) => {
    news.model.find({},(error, nNews) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(nNews);
    });
};

//Get one news by id
const getNewById = (req, res) => {
    news.model.findById(req.params.id, (error, nNews) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!nNews) {
            return res.status(404).send('news not found');
        }
        res.status(200).json(nNews);
    });
};


//update newsSource information
const updateNew = (req, res) => {
    news.model.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, nNews) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!nNews) {
            return res.status(404).send('news not found');
        }
        res.status(200).json(nNews);
    });
};

//delete news
const deleteNew = (req, res) => {
    news.model.findByIdAndRemove(req.params.id, (error, nNews) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!nNews) {
            return res.status(404).send('news not found');
        }
        res.status(200).send('news deleted successfully');
    });
};


module.exports = {createNew, getAllNews, getNewById, updateNew, deleteNew};