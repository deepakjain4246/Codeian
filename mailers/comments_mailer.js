const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside newComment mailer',comment);

    nodeMailer.transporter.sendMail({
        from:'deepakjain4246@gmail.com',
        to:comment.user.email,
        subject:"This is my first mail",
        html:'<h1>Comment is now published!Hurray</h1>'

    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Mail sent',info);
        return;
    });
}