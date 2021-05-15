// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const routes = require('./routes');

//  Connect all our routes to our application
app.use('/', routes);

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
module.exports = app