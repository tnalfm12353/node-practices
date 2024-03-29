const express = require('express');
const http = require('http');
const path = require('path');

const mainRouter = require('./routes/main');
const helloRouter = require('./routes/hello');
const userRouter = require('./routes/user');
const port = 8080;

// Routers
// const mainRouter =  express.Router();
// mainRouter.route("/").get(function(req, res){
//     res.writeHead(200,{'Content-Type' : 'text/html'})
//     res.end('main');
// });

// const helloRouter = express.Router();
// helloRouter.route("/01").get(function(req, res){
//     res.writeHead(200,{'Content-Type' : 'text/html'})
//     res.end('01');
// });

// Application Setup
const application = express()
                            // 1. static serve
                            .use(express.static(path.join(__dirname+ "/public")))
                            // 2. request body parser
                            .use(express.urlencoded({extended: true})) // application/x-www-form-urlencoded 
                            .use(express.json())                       // application/json
                            // 3. view engine setup
                            .set("views",path.join(__dirname,"views"))
                            .set("view engine", "ejs")
                            // 4. request router
                            .all("*", function(req, res, next) {
                                res.locals.req = req;
                                res.locals.resp = res;
                                next();
                            })
                            .use("/", mainRouter)
                            .use("/hello", helloRouter)
                            .use("/user", userRouter);

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