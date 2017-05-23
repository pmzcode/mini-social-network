"use strict"

var Promise = require("bluebird");
var dbcontext = require('.././context/db');

module.exports = (friendRepository, userRepository) => {

    function friendService(friendRepository) {
        var self = this;

        self.getAllFriends = getAllFriends;
        self.addFriend = addFriend;
        self.deleteFriend = deleteFriend;

        var options = {
            limit: 10,
            page: 1,
            order: 'asc',
            orderField: 'id'
        }

        function getAllFriends(data) {
            return new Promise((resolve, reject) => {
                options.page = data.query.page || 1;
                var offset = (options.page - 1) * options.limit;
                var user = data.params.id || data.user.id
                friendRepository.findAndCountAll({
                    limit:options.limit,
                    offset:offset,
                    order: [[options.orderField, options.order.toUpperCase()]],
                    where : {user1_id: user}})
                    .then((info) => {
                            var mass=[];
                            for(var i=0;i<info.rows.length;i++) mass[i]=info.rows[i].dataValues.user2_id;
                            userRepository.findAndCountAll({
                                where :
                                    {
                                        id: {
                                            $in: mass
                                        }
                                    },
                                attributes:["id","InfoId"]

                            })
                                .then((users)=>{
                                    console.log(users);
                                    if(users) resolve(users);
                                    else reject({status: "error", message: 'Failer to get friends'});
                                });
                        })
                    .catch(reject);
            });
        }

        function addFriend(data) {
            return new Promise((resolve, reject) => {
                var dt=new Date();
                var dateOfMessage=dt.getDate()+"."+(dt.getMonth() + 1)+"."+dt.getFullYear()+
                    " "+dt.getHours()+":"+ dt.getMinutes();
                friendRepository.build({user1_id: data.user.id, user2_id: data.params.user_id, date:dateOfMessage}) // 1,'2'
                    .save()
                    .then((info) => {
                        if(info) resolve(info);
                        else reject({status: "error", message: 'Failer add to friends'});
                    })
                    .catch(reject);
            });
        }

        function deleteFriend(data) {
            return new Promise((resolve, reject) => {
                friendRepository.destroy({where:{user1_id: data.user.id, user2_id: data.params.user_id}})
                    .then(() => {
                        resolve({success:true});
                    })
                    .catch(reject);
            });
        }

    }

    return new friendService(friendRepository);

}