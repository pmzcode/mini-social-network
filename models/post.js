"use strict";

module.exports = function(Sequelize, sequelize) {
    var Post = sequelize.define('Post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender: {
            type: Sequelize.INTEGER,
        },
        receiver: {
            type: Sequelize.INTEGER
        },
        message: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return Post;
};