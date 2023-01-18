// include dependancies

var express = require('express');
var errorhandler = require('errorhandler');
var	bodyParser = require('body-parser');
var	helmet = require('helmet');
var colors = require('colors');

// create express app and set the port
var app = express();
var port = 8888;

// set headers defaults 
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
		if ('OPTIONS' == req.method) {
			res.send(200);
		} else {
			next();
		}
});

// security stuff
app.disable('x-powered-by');
app.use(helmet());

// parse the body
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// load our routes and pass in our app 
require('./routes.js')(app); 

// launch  the app
app.listen(port);

console.log(colors.blue('##########################################################################'));
console.log(colors.blue('#'));
console.log(colors.blue('# Application:'), 'Currency');
console.log(colors.blue('# Version:'), 'v0.1');
console.log(colors.blue('# URL:'), 'http://localhost:' + port);
console.log(colors.blue('#'));
console.log(colors.blue('#'), 'The code test is now running on the address above. See the README ');
console.log(colors.blue('#'), 'for details on how to use the API.');
console.log(colors.blue('#'));
console.log(colors.blue('#'), colors.rainbow('Good Luck!'));
console.log(colors.blue('#'));
console.log(colors.blue('##########################################################################'));