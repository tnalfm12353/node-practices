const express = require('express');
const http = require('http');
const path = require('path');

const emaillistRouter = require('./routes/emaillist');
const port = 8080;

const application = express()
                            .use(express.static(path.join(__dirname+ "/public")))
                            .use(express.urlencoded({extended: true})) 
                            .use(express.json())                       
                            .set("views",path.join(__dirname,"views"))
                            .set("view engine", "ejs")
                            .all("*", function(req, res, next) {
                                res.locals.req = req;
                                res.locals.resp = res;
                                next();
                            })
                            .use("/", emaillistRouter)

// Server Setup
http.createServer(application)
    .on('listening', function() {
        console.info(`Http Server Running on Port ${port}`);
    })
    .on('error', function(error) {
        if(error.syscall !== 'listen') {
            throw error;
        }
        switch(error.code) {
            case 'EACCESS' : 
                console.error(`Port: ${port} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE' :
                console.error(`Port: ${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(port);