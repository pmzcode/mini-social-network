"use strict"

const express = require('express');
const config = require("./../config.json");
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


module.exports = (imageServices, promiseHandler) => {

    function ServiceController(imageServices, promiseHandler) {
        const router = express.Router({mergeParams: true});

        router.get("/", (req, res) => {
            promiseHandler(res, imageServices.getImage(req),200,404);
        });

        router.post("/",uploadMiddleware, (req, res) => {
            promiseHandler(res, imageServices.addImage(req),200,404);
        });


        return router;
    }

    return new ServiceController(imageServices,promiseHandler);
}