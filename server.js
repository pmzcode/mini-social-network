"use strict"

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const config = require("./config.json");
const routes = require("./controllers/index");
const Sequelize = require('sequelize');
const dbcontext = require('./context/db')(Sequelize, config);
var sio = require('./utils/io');

const userService = require('./services/session')(dbcontext.user);
const infoService = require('./services/info')(dbcontext.info,dbcontext.user);
const messageService = require('./services/message')(dbcontext.message);
const friendService = require('./services/friend')(dbcontext.friend,dbcontext.user);
const postService = require('./services/post')(dbcontext.post);
const dialogService = require('./services/dialog')(dbcontext.dialog);

const apiController = require('./controllers/index')(userService,infoService,friendService,messageService,
    postService, dialogService,config);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api",apiController);
app.use(require('express').static('static'));

sio(io);

dbcontext.sequelize.sync().then(()=>http.listen(process.env.PORT || 3000,()=>{console.log("Running app...");})) ;

module.exports = app;