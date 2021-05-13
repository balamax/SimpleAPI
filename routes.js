var express = require('express');
// get an instance of router
var router = express.Router();
const twilioProcess = require('./controllers/twilio')

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('Server is running and API is available to consume!');  
});

router.post('/api/sms', twilioProcess.sendSMS);


module.exports = router;