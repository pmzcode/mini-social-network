"use strict"

var Promise = require("bluebird");
var errors = require("./../errors")

module.exports = (postRepository) => {

    var options = {
        limit: 10,
        page: 1,
        order: 'desc',
        orderField: 'id'
    }


    function postService(postRepository) {
        var self = this;

        self.getAllPosts = getAllPosts;
        self.addPost = addPost;
        self.deletePost = deletePost;
        self.getAllUsersPosts = getAllUsersPosts;

        function getAllPosts(data) {
            return new Promise((resolve, reject) => {
                options.page = data.query.page || 1;
                var offset = (options.page - 1) * options.limit;
                var user = data.params.id || data.user.id
                postRepository.findAndCountAll({
                    limit:options.limit,
                    offset:offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    where: {receiver: user}
                    })
                    .then((info) => {

                        if(info) resolve(info);
                        else reject({status: "error", message: 'Failer to get posts'});
                    })
                    .catch(reject);
            });
        }


        function getAllUsersPosts(data){
            return new Promise((resolve, reject) => {
                options.page = data.query.page || 1;
                var offset = (options.page - 1) * options.limit;
                postRepository.findAndCountAll({
                    limit:options.limit,
                    offset:offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                })
                    .then((info) => {

                        if(info) resolve(info);
                        else reject({status: "error", message: 'Failer to get posts'});
                    })
                    .catch(reject);
            });
        }

        function addPost(data) {
            return new Promise((resolve, reject) => {
                var user = data.params.id || data.user.id
                var dt=new Date();
                var dateOfMessage=dt.getDate()+"."+(dt.getMonth() + 1)+"."+dt.getFullYear()+
                    " "+dt.getHours()+":"+ dt.getMinutes();
                postRepository.build({sender: data.user.id, receiver: user, message: data.body.message,date:dateOfMessage})
                    .save()
                    .then((info) => {
                        if(info) resolve(info);
                        else reject({status: "error", message: 'Failer to add post'});
                    })
                    .catch(reject);
            });

        }


        function deletePost(data) {
            return new Promise((resolve, reject) => {
                var user = data.params.id || data.user.id;
                var post = data.query.post_id;
                postRepository.destroy(
                    {
                        where : {
                            id:post,
                            receiver: user

                    }})
                    .save()
                    .then((info) => {
                        if(info) resolve("test");
                        else reject({status: "error", message: 'Failer to delete post'});
                    })
                    .catch(reject);
            });

        }

    }

    return new postService(postRepository);

}