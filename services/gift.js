"use strict"

var Promise = require("bluebird");
var dbcontext = require('.././context/db');

module.exports = (giftRepository) => {

    function giftService(giftRepository) {
        var self = this;

        self.sendPresent = sendPresent;
        self.getPresents = getPresents;

        function getPresents(data) {
            return new Promise((resolve, reject) => {
                giftRepository.findAll({where:{
                    receiver: data.user.id},
                    order: [["id","DESC"]]

                })
                    .then((presents) => {
                        if(presents) resolve(presents);
                        else reject({status: "error", message: 'Failer to get presents'});
                    })
                    .catch(reject);
            });
        }



        function sendPresent(data) {
            return new Promise((resolve, reject) => {
                var type = data.body.type;
                var path = "/images/present" + type + ".png";
                giftRepository.build({sender: data.user.id, receiver: data.params.recepient,
                    type:type, path:path}).save()
                    .then((info) => {
                        if(info) resolve(info);
                        else reject({status: "error", message: 'Failer to send present'});
                    })
                    .catch(reject);
            });
        }


    }

    return new giftService(giftRepository);

}