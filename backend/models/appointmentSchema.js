import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: true,
        minLength: [12, "nic must contain exact 12 digits.."],
        maxLength: [12, "nic must contain exact 12 digits.."]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"]
    },
    gender: {
        type: String,
        required:true,
        emum: ["Male", "Female"]
    },
    appointment_date : {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName : {
            type: String,
             required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited : {
        type: Boolean,
        default : false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
}, {timestamps: true})

export const Appointment = mongoose.model("Appointment", appointmentSchema)