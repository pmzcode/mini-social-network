"use strict"

const express = require('express');
const config = require("./../config.json");


module.exports = (friendsServices, promiseHandler) => {

    function ServiceController(friendsServices, promiseHandler) {
        const router = express.Router({mergeParams: true});

        router.get("/", (req, res) => {
            promiseHandler(res, friendsServices.getAllFriends(req),200,404);
        });

        router.post("/:user_id", (req, res) => {
            promiseHandler(res, friendsServices.addFriend(req),201,404);
        });

        router.delete("/:user_id", (req, res) => {
            promiseHandler(res, friendsServices.deleteFriend(req),200,404);
        });

        return router;
    }

    return new ServiceController(friendsServices,promiseHandler);
}