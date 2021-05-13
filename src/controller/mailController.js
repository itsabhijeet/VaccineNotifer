import { createTransport } from 'nodemailer';

import { MAIL } from '../MailConfig';

const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: MAIL.ID,
      pass: MAIL.PASS
    }
  });
  
  const mailOptions = {
    from: MAIL.ID,
    to: 'myfriend@yahoo.com',
    subject: 'Vaccine Available',
    text: 'That was easy!'
  };
  
  

  export const sendEmail = (email, date) => {
    Object.assign(mailOptions, { ...mailOptions, to: email, text: `Vaccine available on ${date}`});

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }