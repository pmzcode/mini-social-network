"use strict"

const express = require("express");
const Sequelize = require('sequelize');
const config = require("./../config.json");
const auth = require('./../utils/auth')


module.exports=(infoService,friendService,messageService,postService,imageService,promiseHandler)=> {

    const router = express.Router({mergeParams: true});
    const infoController = require('./info')(infoService, promiseHandler);
    const friendsController = require('./friend')(friendService, promiseHandler);
    const messagesController = require('./message')(messageService, promiseHandler);
    const postsController = require('./post')(postService, promiseHandler);
    const imagesController = require('./image')(imageService, promiseHandler);

    router.use('/info',infoController);

    router.use('/friends',friendsController);

    router.use('/posts',postsController);

    router.use('/images',imagesController);


    return router;
}

