"use strict"
var Promise = require("bluebird");
module.exports = (dialogsRepository) => {
    function dialogsService(dialogsRepository) {
        var self = this;
        self.getRoom = getRoom;
        function getRoom(data) {
            return new Promise((resolve, reject) => {
                console.log(data.user.id);
                console.log(data.params.user_id);
                dialogsRepository.findOrCreate(
                    {
                        where:
                        {
                            $or:[
                                {
                                    user1_id: data.params.user_id,
                                    user2_id: data.user.id,
                                },
                                {
                                    user1_id: data.user.id,
                                    user2_id: data.params.user_id
                                }
                            ]
                        },
                        defaults:{ room: data.user.id + data.params.user_id,
                            user1_id: data.user.id,
                            user2_id: data.params.user_id
                        }
                    }).then((rooms) => {
                        if(rooms) resolve(rooms);
                        else reject(rooms);
                });
            });
        }
    }
    return new dialogsService(dialogsRepository);
}