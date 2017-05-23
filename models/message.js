"use strict";

module.exports = function(Sequelize, sequelize) {
    var Message = sequelize.define('Message', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id: {
            type: Sequelize.INTEGER
        },
        recepient_id: {
            type: Sequelize.INTEGER
        },
        text: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Message;
};