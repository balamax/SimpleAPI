const app = require('express')()
const twilioProcess = require('../controllers/twilio')

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end('Servcer is running')
})

module.exports = app