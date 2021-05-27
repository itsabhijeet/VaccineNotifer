import axios from 'axios';
import mongoose from 'mongoose';

import { UserSchema } from '../models/VNmodel';
import { sendEmail } from './MailController';

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

export const notifyJob = () => {
    User.find({}, (err, user) => {
        if(err) {
            console.log(err);
        }
        // For every user check availablity for next few days
        
        let urls = [];
        user.forEach(({ email, district }) => {
            const date = new Date();
            const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
            urls.push({ url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${formattedDate}`, mail: email, date: formattedDate });               
        });

        urls.forEach( ({ url, mail, date }) => {
               
           setTimeout(() =>
            axios.get(url, {
                headers: {
                    'accept': 'application/json',
                    "Accept-Language": "en_US",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51"
                }
            })
                .then((response) => {
                    
                     const { data: { centers } } = response;
                     const slotList = [];
                     centers.forEach((center) => {

                        const { sessions, name, pincode } = center; 
                        const slotsFor18Plus = sessions.filter(({ min_age_limit, available_capacity_dose1}) => min_age_limit === 18 && available_capacity_dose1 > 0);
                    
                        if(slotsFor18Plus.length) { 
                            //console.log(response.data);    
                           // sendEmail(mail, slotsFor18Plus, name, pincode);  //Send mail to use when slot is ther for 18plus
                           const [firstAvailableSession] = slotsFor18Plus; 
                           slotList.push({
                                name, pincode, date: firstAvailableSession.date
                            })
                        };
                     });

                     if(slotList.length) {
                         sendEmail(mail, slotList);
                         console.log({slotList});
                     }


                })
                .catch((error) => console.log(error)) 
           , 5000);   

    });
})
}

// notifyJob.stop();