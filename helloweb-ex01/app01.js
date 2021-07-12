const http = require('http');

const port = 8080;
const server = http.createServer((req,resp) => {
    resp.writeHead(200,{
        "Content-Type": "text/html",
    })

    resp.end("<h1>Hello Web</h1>");
});

server.listen(port, () => {
    console.log(`Http Server Running on Port ${port}`);
})