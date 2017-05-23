"use strict"

const express = require('express');
const config = require("./../config.json");

module.exports = (postsServices, promiseHandler) => {

    function ServiceController(postsServices, promiseHandler) {
        const router = express.Router({mergeParams: true});

        router.get("/", (req, res) => {
            if(req.query.type == "all")
                promiseHandler(res, postsServices.getAllUsersPosts(req),200,404);
            else
                promiseHandler(res, postsServices.getAllPosts(req),200,404);
        });

        router.post("/", (req, res) => {
            promiseHandler(res, postsServices.addPost(req),201,400);
        });

        router.delete("/", (req, res) => {
            promiseHandler(res, postsServices.deletePost(req),200,404);
        });


        return router;
    }

    return new ServiceController(postsServices,promiseHandler);
}