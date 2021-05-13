import axios from 'axios';
import mongoose from 'mongoose';
import cron from 'node-cron';

import { UserSchema } from '../models/vnModel';
import { sendEmail } from './mailController';

const User = mongoose.model('User', UserSchema);

export const addNewUser = (req,res) => {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
        if(err) {
            res.send(err);
        } 
        console.log(user);
        res.json(user);
    })
}

export const getUsers = (req,res) => {
    
    User.find({},(err, user) => {
        if(err) {
            res.send(err);
        } 
        console.log(user);
        res.json(user);
    });
}

export const notifyJob = cron.schedule('*/1 * * * *', () => {
    User.find({}, (err, user) => {
        if(err) {
            console.log(err);
        }
        console.log(user);
        // For every user check availablity for next few days
        let date = new Date();
        let urls = [];
        user.forEach(({ email, pinCode: pin }) => {

            Array(7).fill(7).forEach(() => {
                    date.setDate(date.getDate() + 1);
                    const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
                    urls.push({ url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${formattedDate}`, mail: email, date: formattedDate });               
            })
        });
        // console.log({urls});
        urls.forEach( ({ url, mail, date }) => {
               
           axios.get(url, {
                    headers: {
                        'Accept-Language': 'hi_IN',
                        'accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
                    }
                })
                    .then((response) => {
                        console.log(response.data);
                        const { data: { sessions } } = response;
                        
                        const slotsFor18Plus = sessions.filter(({ min_age_limit}) => min_age_limit === 18);
                        if(slotsFor18Plus.length) {     
                            sendEmail(mail, date);  //Send mail to use when slot is ther for 18plus
                        };
                    })
                    .catch((error) => console.log(error));      

    });
})})