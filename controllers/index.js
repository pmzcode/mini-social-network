"use strict"

const express = require("express");
const Sequelize = require('sequelize');
const config = require("./../config.json");
const auth = require('./../utils/auth');




module.exports=(sessionService,infoService,friendService,messageService,postService,dialogService,imageService, config)=> {

    const router = express.Router({mergeParams: true});
    const sessionsController = require('./session')(sessionService, promiseHandler);
    const userController = require('./user')(infoService,friendService,messageService,postService,promiseHandler);
    const infoController = require('./info')(infoService,promiseHandler);
    const friendController = require('./friend')(friendService,promiseHandler);
    const messageController = require('./message')(messageService,promiseHandler);
    const postController = require('./post')(postService,promiseHandler);
    const dialogController = require('./dialog')(dialogService,promiseHandler);
    const imageController = require('./image')(imageService,promiseHandler);

    router.use('/sessions', sessionsController);
    router.use(auth);
    router.use('/info',infoController);
    router.use('/friends',friendController);
    router.use('/messages',messageController);
    router.use('/posts',postController);
    router.use('/dialogs',dialogController);

    router.use('/users/:id',userController);
    router.use('/images', imageController);

    return router;
}

function promiseHandler(res, promise, succsess, fail) {
    promise
        .then((data) => res.status(succsess).json(data))
        .catch((err) => res.status(fail).json(err));
}