const mailer=require('../../config/mailer');

module.exports.sendMail=async (to, subject, content)=>{
    try{
        let transporter = await mailer.transporter();
        let mailOptions = {
        from: process.env.MAIL_ADDRESS,
        to: to,
        subject: subject,
        html: content
        };

        transporter.sendMail(mailOptions, function(err, data) {
            if (err)
                console.log("Error " + err);
        });
    }catch(err){
        console.log(err);
    }
}