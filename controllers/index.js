"use strict"

const express = require("express");
const Sequelize = require('sequelize');
const config = require("./../config.json");
const auth = require('./../utils/auth');
const multer  = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images/'),

    filename: (req, file, cb) => {
        req.body.path = `${req.body.name}${path.extname(file.originalname)}`;
        cb(null, req.body.path);
    }
});

const upload = multer({ storage });
const uploadMiddleware = upload.fields([
    { name: 'image' },
    { name: 'name' }
]);




module.exports=(sessionService,infoService,friendService,messageService,postService,dialogService, config)=> {

    const router = express.Router({mergeParams: true});
    const sessionsController = require('./session')(sessionService, promiseHandler);
    const userController = require('./user')(infoService,friendService,messageService,postService,promiseHandler);
    const infoController = require('./info')(infoService,promiseHandler);
    const friendController = require('./friend')(friendService,promiseHandler);
    const messageController = require('./message')(messageService,promiseHandler);
    const postController = require('./post')(postService,promiseHandler);
    const dialogController = require('./dialog')(dialogService,promiseHandler)

    router.use('/sessions', sessionsController);
    router.use(auth);
    router.use('/info',infoController);
    router.use('/friends',friendController);
    router.use('/messages',messageController);
    router.use('/posts',postController);
    router.use('/dialogs',dialogController);

    router.use('/users/:id',userController);
    router.post('/images', uploadMiddleware, (req, res) => {
        res.json({
            name: req.body.name,
            path: `/images/${req.body.path}`
        });
    });
    return router;
}

function promiseHandler(res, promise, succsess, fail) {
    promise
        .then((data) => res.status(succsess).json(data))
        .catch((err) => res.status(fail).json(err));
}