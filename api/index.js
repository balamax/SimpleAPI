const app = require('express')()
const twilioProcess = require('../controllers/twilio')

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end(`Hello! Go to item: `)
})

app.post('/api/sms', twilioProcess.sendSMS);

module.exports = app