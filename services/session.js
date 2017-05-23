"use strict"

var Promise = require("bluebird");
var errors = require("./../errors")
const jwt = require('jsonwebtoken');

module.exports = (userRepository) => {

    function sessionService(userRepository) {
        var self = this;

        self.login = login;
        self.registrate = registrate;

        function login(data) {
            return new Promise((resolve, reject) => {
                userRepository.findOne({where: {username: data.username}})
                    .then((user) => {

                        if(!user)
                            reject({status: "error", message: 'Wrong username'});

                        if (data.password == user.password){
                            resolve(user);
                        } else
                            reject({status: "error", message: 'Wrong password'});

                    })
                    .catch(reject);
            });
        }

        function registrate(data) {
            return new Promise((resolve, reject) => {
                userRepository.build({username:data.username, password:data.password})
                    .save().then(res => resolve(res))
                    .catch(err => reject(err));

            });
        }

    }

    return new sessionService(userRepository);

}