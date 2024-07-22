import {Schema, model} from "mongoose";
import validator from "validator";

const messageSchema  = new Schema({
    firstName: {
        type: String, 
        required: true,
        minLength : [3, "firstName must contain atleast 3 characters!!"]
    }, 
    lastName: {
        type: String, 
        required: true,
        minLength : [3, "lasttName must contain atleast 3 characters!!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    phone: {
        type: String, 
        required: true,
        minLength: [10, "Phone number must contain exact 10 digits.."],
        maxLength: [10, "Phone number must contain exact 10 digits.."]
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "message must contain atleast 10 characters"]
    }
}, {timestamps: true})

export const Message = model('Message', messageSchema)