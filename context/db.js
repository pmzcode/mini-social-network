"use strict"

module.exports = (Sequelize, config) => {

    const dbConfig = process.env.PMZ_PROJECT === 'production' ? config.prod : config.db;

    const options = {
        host: dbConfig.host,
        dialect: dbConfig.driver
    };

    const sequelize = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, options);
    const User = require('../models/user')(Sequelize, sequelize);
    const Info = require('../models/info')(Sequelize, sequelize);
    const Friend = require('../models/friends')(Sequelize, sequelize);
    const Message = require('../models/message')(Sequelize, sequelize);
    const Post = require('../models/post')(Sequelize, sequelize);
    const Dialog = require('../models/dialog')(Sequelize, sequelize);

    User.belongsTo(Info);


    return {
        user: User,
        info: Info,
        friend: Friend,
        message:Message,
        post: Post,
        dialog: Dialog,
        sequelize: sequelize
    };
};