"use strict"

const jwt = require('jsonwebtoken');
const config = require('./../config.json');

module.exports = function (req, res, next) {
    let token = req.cookies.token;
    if (token) {
        jwt.verify(token, config.secret_key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: "error", message: 'Failed to authenticate token' });
            } else {
                req.user = decoded;
                console.log(decoded);
                next();
            }
        });
    } else {
        return res.status(401).send({
            status: "error",
            message: 'No token provided'
        });
    }
}