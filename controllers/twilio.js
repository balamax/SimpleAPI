
const twilioProcess = {
    async sendSMS (req, res) {
      try {
        res.send({success:true,sms:'sent'});
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