var twilio = require('twilio');

const twilioProcess = {
    async sendSMS (req, res) {
      try {
        var accountSid = 'AC2299b4b9226b61d4250d83470fff9284'; // Your Account SID from www.twilio.com/console
        var authToken = '41439a7ac45b5b1d166a0473cfe47519';   // Your Auth Token from www.twilio.com/console
        
        var client = new twilio(accountSid, authToken);
        
        client.messages.create({
            body: 'Hello from Node',
            to: '+919840580079',  // Text this number
            from: '+919840580079' // From a valid Twilio number
        })
        .then((message) => {
          console.log(message);
          res.send({success:true, message:message});
        })
        .catch(e => { 
          console.error('Got an error:', e.code, e.message);
          res.send({success:false, error:e});
        });
        
      } catch (err) {
        console.log(err.type);
        console.log(err.message);
        switch (err.type) {
          case 'StripeCardError':
            // A declined card error
            err.message; // => e.g. "Your card's expiration year is invalid."
            break;
          case 'StripeRateLimitError':
            // Too many requests made to the API too quickly
            break;
          case 'StripeInvalidRequestError':
            // Invalid parameters were supplied to Stripe's API
            break;
          case 'StripeAPIError':
            // An error occurred internally with Stripe's API
            break;
          case 'StripeConnectionError':
            // Some kind of error occurred during the HTTPS communication
            break;
          case 'StripeAuthenticationError':
            // You probably used an incorrect API key
            break;
          default:
            // Handle any other types of unexpected errors
            break;
        }
        res.send(err);
      }
    }
  }
  module.exports = twilioProcess;