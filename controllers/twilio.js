var twilio = require('twilio');

const twilioProcess = {
    async sendSMS (request, res) {
      try {
        console.log(request.body);
        if(request.body.authCode == 'BKSL'){

          if(request.body.asid == null){
            return res.send({success:false, error: 'Invalid request header'});
          }
          if(request.body.atkn == null || request.body.message == null){
            return res.send({success:false, error: 'Invalid request property'});
          }
          if(request.body.from == null || request.body.to == null){
            return res.send({success:false, error: 'Invalid message property'});
          }
          var accountSid = request.body.asid;
          var authToken = request.body.atkn;
          
          var client = new twilio(accountSid, authToken);
          
          client.messages.create({
              body: request.body.message,
              to: request.body.to, 
              from: request.body.from 
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