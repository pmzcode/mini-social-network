"use strict"

var Promise = require("bluebird");
var errors = require("./../errors")
const jwt = require('jsonwebtoken');

module.exports = (infoRepository, userRepository) => {

    function infoService(infoRepository, userRepository) {
        var self = this;

        self.getInfo = getInfo;
        self.fillInfo = fillInfo;
        self.searchInfo = searchInfo;
        self.getPeoplesInfo = getPeoplesInfo;
        self.updateInfo = updateInfo;

        function getInfo(data) {
            return new Promise((resolve, reject) => {
                userRepository.findOne({where: {id: data}})
                    .then(data2 => {

                        infoRepository.findOne({where: {id: data2.InfoId}})
                            .then((info) => {
                                if (info) resolve(info);
                                else reject({status: "error", message: 'Failer to get info'});
                            });
                    })
                    .catch(reject);
            });
        }

        function fillInfo(data) {
            return new Promise((resolve, reject) => {
                if (data.user) {
                    infoRepository.build({
                        name: data.body.name, surname: data.body.surname,
                        birtdate: data.body.birtdate, location: data.body.location
                    })
                        .save().then(res => {
                        userRepository.update({InfoId: res.id}, {where: {id: data.user.id}})
                            .save()
                            .then(data => {
                                resolve(res)
                            })
                    })
                        .catch(err => reject(err));
                }
            });
        }

        function searchInfo(data) {
            return new Promise((resolve, reject) => {
                infoRepository.findAll({where: { $or:[ {name: {$like: '%' + data + '%'}},{surname: {$like: '%' + data + '%'}}]}})
                    .then((info) => {
                        var informations = [];
                        var peoples = [];
                        info.forEach((single)=>{
                            informations[informations.length] = single.id;
                            peoples[peoples.length] =
                            {id: "", name: single.name, surname: single.surname};
                        });
                        userRepository.findAll({where: {InfoId: {$in:informations}}})
                            .then((result) => {
                                for (var i = 0; i < result.length; i++)
                                    peoples[i].id = result[i].id;
                                if (peoples) resolve(peoples);
                                else reject({status: "error", message: 'Failer to get info'});
                            })

                    })
                    .catch(reject);
            });
        }


        var options = {
            limit: 10,
            page: 1,
            order: 'asc',
            orderField: 'id'
        }

        function getPeoplesInfo(data) {
            return new Promise((resolve, reject) => {
                var peoples = [];
                var information = [];
                var i = 0;

                if (data.query.type = "all") {
                    options.page = data.query.page || 1;
                    var offset = (options.page - 1) * options.limit;

                    infoRepository.findAll(
                        {
                            limit: options.limit,
                            offset: offset,
                            order: [[options.orderField, options.order.toUpperCase()]],
                        })
                        .then((infos) => {
                            infos.forEach((info)=> {
                                peoples[peoples.length] = info.dataValues.id;
                                information[information.length] =
                                {id: "", name: info.dataValues.name, surname: info.dataValues.surname};
                            });
                            userRepository.findAndCountAll({
                                where: {
                                    InfoId: {
                                        $in: peoples
                                    }
                                }
                            })
                                .then((result) => {
                                    for (var i = 0; i < result.rows.length; i++)
                                        information[i].id = result.rows[i].dataValues.id;
                                    if (information) resolve({"count":result.count ,"rows":information});
                                    else reject({status: "error", message: 'Failer to get info'});
                                })

                        });


                }

            });
        }

        function updateInfo(data) {
            return new Promise((resolve, reject) => {
                userRepository.findById(data.user.id)
                    .then((user)=>{
                        infoRepository.update({
                            name: data.body.name, surname: data.body.surname,
                            birtdate: data.body.birtdate, location: data.body.location
                        },{where:{id:user.InfoId}})
                            .then(res => {
                            resolve({success:true});
                        })
                    })
                    .catch(err => reject(err));
            });
        }
    }

    return new infoService(infoRepository, userRepository);

}