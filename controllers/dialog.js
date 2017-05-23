"use strict"

const express = require('express');
const config = require("./../config.json");

module.exports = (dialogsServices, promiseHandler) => {

    function ServiceController(diaologsServices, promiseHandler) {
        const router = express.Router({mergeParams: true});


        router.get("/:user_id", (req, res) => {
            promiseHandler(res, diaologsServices.getRoom(req),200,404);
        });

        return router;
    }

    return new ServiceController(dialogsServices,promiseHandler,201,404);
}