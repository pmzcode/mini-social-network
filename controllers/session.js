"use strict"

const express = require('express');
const jwt = require('jsonwebtoken');
const config = require("./../config.json");

module.exports = (sessionsServices, promiseHandler) => {

    function ServiceController(sessionsServices, promiseHandler) {
        const router = express.Router({mergeParams: true});

        router.post("/registrations", (req, res) => {
            promiseHandler(res, sessionsServices.registrate(req.body),201,400);
        });

        router.post("/", (req, res) => {

            promiseHandler(res, sessionsServices.login(req.body)
                .then((user)=> {
                        return new Promise((resolve, reject) => {
                            let us={id:user.id ,username:user.username};
                            let token = jwt.sign(us, config.secret_key);
                            res.cookie("token", token);
                            res.send(us);
                        })
                    }),200,404);
            console.log(req.cookies);
        });

        router.delete("/", (req, res) => {
            res.cookie("token","");
            res.redirect('/index.html');
        });

        return router;
    }

    return new ServiceController(sessionsServices,promiseHandler);
}