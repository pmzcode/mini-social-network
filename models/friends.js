"use strict"

module.exports = function(Sequelize, sequelize) {
    var Friend = sequelize.define('Friend', {
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
        date: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Friend;
};