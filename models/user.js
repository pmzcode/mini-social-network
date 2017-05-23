"use strict";

module.exports = function(Sequelize, sequelize) {
    var User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return User;
};