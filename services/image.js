"use strict"

var Promise = require("bluebird");
var errors = require("./../errors")

module.exports = (infoRepository, userRepository) => {


    function imageService(infoRepository) {
        var self = this;

        self.addImage = addImage;
        self.deleteImage = deleteImage;
        self.getImage = getImage;



        function addImage(data) {
            return new Promise((resolve, reject) => {
                infoRepository.update({
                    avatar:`/images/${data.body.path}`
                },{where:{id:data.user.id}})
                    .then(res => {
                        resolve({
                            name: data.body.name,
                            path: `/images/${data.body.path}`
                        });
                    })

            });

        }

        function getImage(data) {
            return new Promise((resolve, reject) => {
                var user = data.params.id || data.user.id;
                userRepository.findById(user)
                    .then(user => {
                        infoRepository.findById(user.InfoId)
                            .then(res => {
                                resolve({
                                    path: res.avatar
                                });
                            });
                    });
            });

        }


        function deleteImage(data) {
            return new Promise((resolve, reject) => {
                var user = data.params.id || data.user.id;
                var post = data.query.post_id;
                postRepository.destroy(
                    {
                        where : {
                            id:post,
                            receiver: user

                        }})
                    .then((info) => {
                        resolve({success:true});

                    })
                    .catch(reject);
            });

        }

    }

    return new imageService(infoRepository, userRepository);

}