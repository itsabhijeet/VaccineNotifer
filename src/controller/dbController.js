import mongoose from 'mongoose';
import { UserSchema } from '../models/vnModel';

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