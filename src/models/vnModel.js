import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    mobile: {
        type: String,
        required: 'Enter mobile number'
    },
    pinCode: {
        type: String,
        required: 'Enter pin code'
    },
    email: {
        type: String,
        required: 'Enter email'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});