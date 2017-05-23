"use strict"

module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: config.db.driver
    };

    const sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, options);
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