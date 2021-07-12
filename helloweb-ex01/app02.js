const http = require('http');
const fs = require('fs');

const port = 8080;
const server = http.createServer((req,resp) => {
    console.log(req.url);

    if(req.url === '/'){
        req.url = '/hello.html';
    }

    fs.readFile(__dirname + "/public" + req.url, function(error, data){
        resp.writeHead(200,{
            "Content-Type": "text/html"
        });
    
        resp.end(data);
    });
});

server.listen(port, () => {
    console.log(`Http Server Running on Port ${port}`);
})