var express = require('express');
var app= express();
var pug = require('pug');
var http = require('http');
var fs = require('fs');

app.set('views', './');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
res.render('index.pug');
});

var port = 8080;
// Create Local Server
var server = http.createServer(app);

//Listen on port 80
app.listen(port, function() {
	console.log('Listening on port ' + port);
});