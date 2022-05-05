const nodemailer = require('nodemailer');
let token = "";

const emailProcess = {
    async sendMail (request, res) {
        try{
            console.log(request.body);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'hi@cleverjob.in',
                  pass: token,
                },
              });
              transporter.sendMail({
                from: 'hi@ceverjob.in', // sender address
                to: "balacrz@gmail.com", // list of receivers
                subject: "Test Message", // Subject line
                text: "There is a new article. It's about sending emails, check it out!", // plain text body
                html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
              }).then(info => {
                console.log({info});
              }).catch(console.error);
            res.send({success:true});
        
        } catch (err) {
            console.log(err.type);
            console.log(err.message);
            res.send(err);
        }
    }
}

module.exports = emailProcess;