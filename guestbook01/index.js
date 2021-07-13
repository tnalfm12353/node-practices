const express = require('express');
const http = require('http');
const path = require('path');

const guestbookRouter = require("./routes/guestbook");
const port = 8080;

const application = express()
                            .use(express.static(path.join(__dirname, "public")))
                            .use(express.urlencoded({extended: true}))
                            .use(express.json())
                            .set("views", path.join(__dirname, "views"))
                            .set("view engine", "ejs")
                            .all("*", (req,res,next) => {
                                res.locals.req = req;
                                res.locals.res = res;
                                next();
                            })
                            .use("/", guestbookRouter);

http.createServer(application).listen(port);