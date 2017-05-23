"use strict"

const express = require("express");

module.exports = (messagesServices, promiseHandler) => {

    function ServiceController(messagesServices, promiseHandler) {
        const router = express.Router({mergeParams: true});

        router.post("/:recipient", (req, res) => {
            promiseHandler(res, messagesServices.sendMessage(req),201,400);
        });

        router.get("/:recipient", (req, res) => {
            promiseHandler(res, messagesServices.getUserMessages(req),200,404);
        });

        router.get("/", (req, res) => {
            promiseHandler(res, messagesServices.getAllMessages(req),200,404);
        });

        return router;
    }

    return new ServiceController(messagesServices,promiseHandler);
}