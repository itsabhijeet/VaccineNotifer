import { createTransport } from 'nodemailer';

import { MAIL } from '../MailConfig';
import { map } from '../../index';

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

  export const sendEmail = (email, slots) => {
    let text = "";
    console.log(map);
    slots.forEach((slot) => {
      const { date, name, pincode, id } = slot;
      if(map.has(id)) {
        console.log(`Already sent mail for this: ${name} - ${pincode} for ${date}`);
      } else {
        map.set(id, true);
        text += `Vaccine available at ${name}, Pincode: ${pincode} on ${date}.\n`;
      }
    })
    console.log(text);
    if(text.length == 0) {
      console.log("No new slots!");
      return;
    } 
    Object.assign(mailOptions, { ...mailOptions, to: email, text});

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }