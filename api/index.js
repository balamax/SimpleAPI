const app = require('express')()

const twilioProcess = require('../controllers/twilio')

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end('Api services are running!')
})

app.post('/api/mms', (request, res) => {
    console.log(request);
    const { body } = request
    res.send(`Hello ${body.name}, you just parsed the request body!`)
  }
  );

app.post('/api/sms', twilioProcess.sendSMS);

module.exports = app