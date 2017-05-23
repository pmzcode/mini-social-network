"use strict"

const express = require('express');
const config = require("./../config.json");

module.exports = (infoServices, promiseHandler) => {

    function ServiceController(infoServices, promiseHandler) {
        const router = express.Router({mergeParams: true});

        router.post("/", (req, res) => {

            if(!req.params.id)
                promiseHandler(res, infoServices.fillInfo(req),201,400);
            else
                promiseHandler(res, new Promise((resolve,reject)=>{reject("Error in post info")}),201,400);
        });

        router.get("/", (req, res) => {
            var data = req.params.id || req.user.id;
            if(req.query.name)
                promiseHandler(res, infoServices.searchInfo(req.query.name),200,400);
            else if(req.query.type)
                promiseHandler(res, infoServices.getPeoplesInfo(req),200,400);
            else
                promiseHandler(res, infoServices.getInfo(data),200,400);
        });


        router.put("/", (req, res) => {
            if(req.user)
                promiseHandler(res, infoServices.updateInfo(req),201,400);
        });


        return router;
    }

    return new ServiceController(infoServices,promiseHandler);
}