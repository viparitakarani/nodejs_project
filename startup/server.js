#!/usr/local/bin/node

var http = require('http');
var fs = require('fs')

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req, res) {
	fs.readFile('index.html', function(err, data) {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write(data);
    	res.end();
	});
});

server.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});

