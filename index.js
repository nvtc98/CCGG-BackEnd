const startServer=require('./src/express');

global.__basedir = __dirname;

startServer();