const express = require('express');
const session = require('express-session');
const http = require('http');
const multer = require('multer');
const auth = require("./routes/auth");
const path = require('path');
const dotenv = require("dotenv");

// Environment Variables(환경 변수)
dotenv.config({ path: path.join(__dirname, 'config/app.env') });
dotenv.config({ path: path.join(__dirname, 'config/db.env') });

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const guestbookRouter = require('./routes/guestbook');
const galleryRouter = require('./routes/gallery');
const errorRouter = require('./routes/error');
const adminRouter = require('./routes/admin');

const userApiRouter = require('./routes/user-api');
const guestbookApiRouter = require('./routes/guestbook-api');


//Logging
const logger = require("./logging");

const application = express()
                            // session environment
                            .use(session({
                                secret: 'peachong',         // 쿠키 변조를 방지하기 위한 값.
                                resave: false,              // 요청 처리에서 session의 변경 사항이 없어도 항상 저장.
                                saveUninitialized: false    // 새로 session을 생성할 때 "uninitialized" 상태로 둔다. 따라서 로그인 session에서는 false로 하는 것이 좋다.
                            }))
                            .use(express.urlencoded({extended: true})) 
                            .use(express.json())
                            // multipart
                            .use(multer({
                                dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE),
                            }).single('file'))
                            .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
                            .set("views",path.join(__dirname,"views"))
                            .set("view engine", "ejs")
                            .all("*", function(req, res, next) {
                                res.locals.req = req;
                                res.locals.resp = res;
                                next();
                            })
                            .use("/", mainRouter)
                            .use("/user", userRouter)
                            .use("/api/user", userApiRouter)
                            .use("/guestbook", guestbookRouter)
                            .use("/api/guestbook", guestbookApiRouter)
                            .use("/gallery", galleryRouter)
                            .use("/admin", auth("ADMIN"),adminRouter)
                            .use(errorRouter.error404)
                            .use(errorRouter.error500);

// Server Setup
http.createServer(application)
    .on('listening', function() {
        logger.info(`Http Server Running on Port ${process.env.PORT}`);
    })
    .on('error', function(error) {
        if(error.syscall !== 'listen') {
            throw error;
        }
        switch(error.code) {
            case 'EACCESS' : 
                logger.error(`Port: ${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE' :
                logger.error(`Port: ${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(process.env.PORT);