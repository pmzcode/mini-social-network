"use strict"

var Promise = require("bluebird");
var errors = require("./../errors")
const jwt = require('jsonwebtoken');

module.exports = (messageRepository) => {


    var options = {
        limit: 10,
        page: 1,
        order: 'desc',
        orderField: 'id'
    }

    function messageService(messageRepository) {
        var self = this;

        self.sendMessage = sendMessage;
        self.getAllMessages = getAllMessages;
        self.getUserMessages = getUserMessages;

        function sendMessage(data) {
            return new Promise((resolve, reject) => {
                var dt=new Date();
                var dateOfMessage=dt.getDate()+"."+(dt.getMonth() + 1)+"."+dt.getFullYear()+
                    " "+dt.getHours()+":"+ dt.getMinutes();
                messageRepository.build({sender_id: data.user.id, recepient_id: data.params.recipient,
                    text:data.body.text, date:dateOfMessage, status:"unread"}).save()
                    .then((info) => {
                        if(info) resolve(info);
                        else reject({status: "error", message: 'Failer to send message'});
                    })
                    .catch(reject);
            });

        }




        function getUserMessages(data) {
            return new Promise((resolve, reject) => {
                options.page = data.query.page || 1;
                var offset = (options.page - 1) * options.limit;
                var id = data.user.id;
                var recipient = data.params.recipient;
                if(data.query.type=="incomming"){
                    messageRepository.findAndCountAll({
                        limit:options.limit,
                        offset:offset,
                        order: [[options.orderField, options.order.toUpperCase()]],
                        where:
                            {
                                sender_id: recipient,
                                recepient_id: id
                            }

                        })
                        .then((info) => {
                            if (info) resolve(info);
                            else reject({status: "error", message: 'Failer to get messages'});
                            messageRepository.update({status: "read"}, {where: {
                                sender_id: recipient,
                                recepient_id: id,
                                status: "unread"}}).save();
                        })
                        .catch(reject);
                }
                else if(data.query.type=="outcomming"){
                    messageRepository.findAndCountAll({
                        limit:options.limit,
                        offset:offset,
                        order: [[options.orderField, options.order.toUpperCase()]],
                        where:
                    {
                        sender_id: id,
                        recepient_id: recipient
                    }

                    })
                        .then((info) => {
                            if (info) resolve(info);
                            else reject({status: "error", message: 'Failer to get messages'});
                            messageRepository.update({status: "read"}, {where: {
                                sender_id: recipient,
                                recepient_id: id,
                                status: "unread"}}).save();
                        })
                        .catch(reject);
                }
                else if(data.query.type=="unread"){
                    messageRepository.findAndCountAll({
                        limit:options.limit,
                        offset:offset,
                        order: [[options.orderField, options.order.toUpperCase()]],
                        where: {
                        sender_id: recipient,
                        recepient_id: id,
                        status: "unread"
                        }})
                        .then((info) => {
                            console.log(info);
                            resolve(info);
                        })

                        .catch(reject);
                }
                else{
                    messageRepository.findAndCountAll({
                        limit:options.limit,
                        offset:offset,
                        order: [[options.orderField, options.order.toUpperCase()]],
                        where: {
                        $or:[
                            {
                                sender_id: id,
                                recepient_id: recipient
                            },
                            {
                                sender_id: recipient,
                                recepient_id: id
                            }

                        ]}})
                        .then((info) => {
                            if (info) resolve(info);
                            else reject({status: "error", message: 'Failer to get messages'});
                            messageRepository.update({status: "read"}, {where: {
                                sender_id: recipient,
                                recepient_id: id,
                                status: "unread"}}).save();
                        })
                        .catch(reject);
                }
            });
        }

        function getAllMessages(data) {
            return new Promise((resolve, reject) => {
                var id = data.user.id;
                if(data.query.type=="incomming"){
                    messageRepository.findAndCountAll({where:
                    {
                        recepient_id: id
                    }

                    })
                        .then((info) => {
                            if (info) resolve(info);
                            else reject({status: "error", message: 'Failer to get messages'});
                            messageRepository.update({status: "read"}, {where: {
                                recepient_id: id,
                                status: "unread"}}).save();
                        })
                        .catch(reject);
                }
                else if(data.query.type=="outcomming"){
                    messageRepository.findAndCountAll({where:
                    {
                        sender_id: id,
                    }
                    })
                        .then((info) => {
                            if (info) resolve(info);
                            else reject({status: "error", message: 'Failer to get messages'});
                            messageRepository.update({status: "read"}, {where: {
                                recepient_id: id,
                                status: "unread"}}).save();
                        })
                        .catch(reject);
                }
                else if(data.query.type=="unread"){
                    messageRepository.findAndCountAll({where: {
                        recepient_id: id,
                        status: "unread"
                    }})
                        .then((info) => {
                            resolve(info);

                })
                        .catch(reject);
                }
                else{
                    messageRepository.findAndCountAll({where: {
                        $or:[
                            {
                                sender_id: id,
                            },
                            {
                                recepient_id: id
                            }
                        ]}})
                        .then((info) => {
                            if (info) resolve(info);
                            else reject({status: "error", message: 'Failer to get messages'});
                            messageRepository.update({status: "read"}, {where: {
                                recepient_id: id,
                                status: "unread"}}).save();
                        })
                        .catch(reject);
                }
            });
        }

    }

    return new messageService(messageRepository);

}