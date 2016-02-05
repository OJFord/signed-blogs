'use strict';

var express		= require('express');
var app			= express();

var path		= require('path');
var bodyParser	= require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'npm static')));

app.use('/', require('./routes/index'));
app.use('/', require('./routes/list'));
app.use('/', require('./routes/article'));

app.listen(8080);
