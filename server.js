var express = require('express');
var app = express();
var pug = require('pug');
var https = require('https'); // HTTPS server
var http = require('http'); // HTTP server
var fs = require('fs');
var key = fs.readFileSync('encryption/my-server.key.pem');
var ca = fs.readFileSync('encryption/my-root-ca.crt.pem');
var crt = fs.readFileSync('encryption/my-server.crt.pem');

// HTTPS server
var options = {
	key: key,
	cert: crt,
	ca: ca
};

var port = process.env.PORT;
var secPort = process.env.PORT_SEC;
app.set('port', port);

app.set('views', './');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
	res.render('index.pug');
});

// Create HTTP Server
var server = http.createServer(app);
// Create HTTPS Server
var serverSec = https.createServer(options, app);

// Listen on provided port, on all network interfaces
server.listen(port);
serverSec.listen(secPort);