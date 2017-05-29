"use strict"

module.exports = function(Sequelize, sequelize) {
    var Gift = sequelize.define('Gift', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        path: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    });

    return Gift;
};