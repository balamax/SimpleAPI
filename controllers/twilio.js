var twilio = require('twilio');

const twilioProcess = {
    async sendSMS (req, res) {
      try {

        console.log(req.body);
        if(req.body.authCode == 'BKSL'){

          if(req.body.asid == null){
            return res.send({success:false, error: 'Invalid request header'});
          }
          if(req.body.atkn == null || req.body.message == null){
            return res.send({success:false, error: 'Invalid request property'});
          }
          if(req.body.from == null || req.body.to == null){
            return res.send({success:false, error: 'Invalid message property'});
          }
          var accountSid = req.body.asid;
          var authToken = req.body.atkn;
          
          var client = new twilio(accountSid, authToken);
          
          client.messages.create({
              body: req.body.message,
              to: req.body.to, 
              from: req.body.from 
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