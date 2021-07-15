# Mysite on Node(Expresss)

## 설치패키지

> `$` npm i express  
> `$` npm i express-session  
> `$` npm i ejs  
> `$` npm i dotenv (config)  
> `$` npm i sequlize  
> `$` npm i mysql2  
> `$` npm i moment  (dateformat)
> `$` npm i winston  (zip??)
> `$` npm i winston-daily-rotate-file  
> `$` npm i -D nodemon

## scripts in package.json
```
JSON
{
.
.
    "scripts": {
    "start" : "node index.js",
    "debug" : "nodemon index.js"
    },
.
.
}
```

## project structure
<pre>
/mysite
    |--- index.js
    |--- package.json
    |--- package-lock.json
    |--- /node-modules
    |--- /config
    |--- /logging
    |--- /logs
    |--- /public
    |--- /routes
    |--- /controllers
    |--- /models
    |--- /views
            |--- /main
            |--- /user
            |--- /guestbook
            |--- /board
            |--- /gallery
            |--- /admin

</pre>