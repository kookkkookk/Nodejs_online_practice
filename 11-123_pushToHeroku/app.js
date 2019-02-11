var http = require('http');
http.createServer((req, res)=>{
    if(req.url === '/'){
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<h1>index!!!!</h1>');
        res.end();
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<h1>404!</h1>');
        res.end();
    }
}).listen(process.env.PORT || 8080);