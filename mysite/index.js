const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const dotenv = require("dotenv");

// Environment Variables(환경 변수)
dotenv.config({ path: path.join(__dirname, 'config/app.env') });
dotenv.config({ path: path.join(__dirname, 'config/db.env') });

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const guestbookRouter = require('./routes/guestbook');

const application = express()
                            .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_PUBLIC)))
                            // session environment
                            .use(session({
                                secret: 'peachong',         // 쿠키 변조를 방지하기 위한 값.
                                resave: false,              // 요청 처리에서 session의 변경 사항이 없어도 항상 저장.
                                saveUninitialized: false    // 새로 session을 생성할 때 "uninitialized" 상태로 둔다. 따라서 로그인 session에서는 false로 하는 것이 좋다.
                            }))
                            .use(express.urlencoded({extended: true})) 
                            .use(express.json())
                            .set("views",path.join(__dirname,"views"))
                            .set("view engine", "ejs")
                            .all("*", function(req, res, next) {
                                res.locals.req = req;
                                res.locals.resp = res;
                                next();
                            })
                            .use("/", mainRouter)
                            .use("/user", userRouter)
                            .use("/guestbook", guestbookRouter)
                            .use((req, res) => {
                                res.render('error/404');
                            });

// Server Setup
http.createServer(application)
    .on('listening', function() {
        console.info(`Http Server Running on Port ${process.env.PORT}`);
    })
    .on('error', function(error) {
        if(error.syscall !== 'listen') {
            throw error;
        }
        switch(error.code) {
            case 'EACCESS' : 
                console.error(`Port: ${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE' :
                console.error(`Port: ${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(process.env.PORT);