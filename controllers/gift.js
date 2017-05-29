"use strict"

const express = require('express');
const config = require("./../config.json");


module.exports = (giftServices, promiseHandler) => {

    function ServiceController(giftServices, promiseHandler) {
        const router = express.Router({mergeParams: true});

        router.get("/", (req, res) => {
            promiseHandler(res, giftServices.getPresents(req),200,404);
        });

        router.post("/:recepient", (req, res) => {
            promiseHandler(res, giftServices.sendPresent(req),200,404);
        });


        return router;
    }

    return new ServiceController(giftServices,promiseHandler);
}