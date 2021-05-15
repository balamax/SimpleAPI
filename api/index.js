const app = require('express')()

const twilioProcess = require('../controllers/twilio')

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end('Api services are running!')
})

app.post('/api/mms', (req, res) => {
    console.log(req.body);
    const name = req?.body?.name ?? 'world';
    console.log(name);
    console.log(req?.body);
    res.send(`Hello ${name}, you just parsed the req body!`)
  }
  );

app.post('/api/sms', twilioProcess.sendSMS);

module.exports = app