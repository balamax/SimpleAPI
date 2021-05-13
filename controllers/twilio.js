var twilio = require('twilio');

const twilioProcess = {
    async sendSMS (req, res) {
      try {
        const { body } = req
        console.log(body);
        if(body.authCode == 'BKSL'){

          if(body.asid == null){
            return res.send({success:false, error: 'Invalid request header'});
          }
          if(body.atkn == null || body.message == null){
            return res.send({success:false, error: 'Invalid request property'});
          }
          if(body.from == null || body.to == null){
            return res.send({success:false, error: 'Invalid message property'});
          }
          var accountSid = body.asid;
          var authToken = body.atkn;
          
          var client = new twilio(accountSid, authToken);
          
          client.messages.create({
              body: body.message,
              to: body.to, 
              from: body.from 
          })
          .then((message) => {
            console.log(message);
            res.send({success:true, message:message});
          })
          .catch(e => { 
            console.error('Got an error:', e.code, e.message);
            res.send({success:false, error:e});
          });
        }
        else{
          return res.send({success:false, error: 'Invalid request token'});
        }
        
      } catch (err) {
        console.log(err.type);
        console.log(err.message);
        res.send(err);
      }
    }
  }
  module.exports = twilioProcess;