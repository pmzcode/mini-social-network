"use strict";

module.exports = function(Sequelize, sequelize) {
    var Info = sequelize.define('Info', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING
        },
        birtdate: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        interests: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return Info;
};