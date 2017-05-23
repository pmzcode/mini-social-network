"use strict"

module.exports = function(Sequelize, sequelize) {
    var Room = sequelize.define('Room', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user1_id: {
            type: Sequelize.INTEGER
        },
        user2_id: {
            type: Sequelize.INTEGER
        },
        room: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    });

    return Room;
};