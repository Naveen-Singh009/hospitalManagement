import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js"
import { generateToken } from "../utils/jwtToken.js"
import {v2 as cloudinary} from "cloudinary"

export const patientRegister =  catchAsyncErrors(async (req, res, next) => {
    const {
        firstName, 
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        role,
        nic
    } = req.body 

    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please fill full form!!!", 400))
    } 

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User Already exist", 400))
    }

    user = await User.create({
        firstName, 
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        role,
        nic
    })

    generateToken(user, "User Registered", 200, res)

    // res.status(200).json({
    //     success: true,
    //     message : "user registered",
    // });
})

export const login = catchAsyncErrors( async(req, res, next) =>{
    const {email, password , confirmPassword, role} = req.body
    if(!email || !password || !role || !confirmPassword){
        return next(new ErrorHandler("please provide all fields..", 400))
    }

    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and Confirm password does not match..", 400))
    }

    const user = await User.findOne({email}).select("+password");


    if(!user){
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }

    const isPasswordMatched = user.comparePassword(password)

    console.log(isPasswordMatched);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }

    if(role !== user.role){
        return next(new ErrorHandler("User with this role is not found", 400))
    }

    // return res
    // .status(200)
    // .json({
    //     success: true,
    //     message: "User Logged In successfully"
    // })
    generateToken(user, "User loggedIn successfully", 200, res)

})

export const addNewAdmin = catchAsyncErrors( async(req, res , next)=>{
    const {
        firstName, 
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic
    } = req.body 

    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("Please fill full form!!!", 400))
    } 

    const isRegistered = await User.findOne({email});

    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists!!`));
    }

    const admin = await User.create({
        firstName, 
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "Admin"
    });

    return res
    .status(200)
    .json({
        success: true,
        message: "New Admin is Registered"
    })

})


export const getAllDoctors = catchAsyncErrors ( async (req, res, next) => {
    const doctors = await User.find({role: "Doctor" })
    return res
    .status(200)
    .json({
        success: true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    return res
    .status(200)
    .json({
        success: true,
        user
    })
})

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    return res
    .status(200)
    .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    .json({
        success : true,
        message: "User Logged out successfully !!"
    })
})
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    return res
    .status(200)
    .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    .json({
        success : true,
        message: "User Logged out successfully !!"
    })
})

export const addNewDoctor  = catchAsyncErrors(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar required ! ", 400))
    }

    const {docAvatar} = req.files; // this same name will used for forntend otherwise the error will be there

    const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/webp"
    ]

    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("file format not supported ! ", 400))
    }


    const {
        firstName, 
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment
    } = req.body 
    
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(
            new ErrorHandler("Please provide full details !!", 400)
        )
    }

    const isRegistered = await User.findOne({email})

    if(isRegistered){
        new ErrorHandler(`${isRegistered.role} already registered with this email`, 400)
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary Error : ", 
            cloudinaryResponse.error || "Unknown cloudinary error"
        )
    }

    const doctor = await User.create({
        firstName, 
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url : cloudinaryResponse.secure_url
        }
    })

    return res
    .status(200)
    .json({
        success: true, 
        message: "New Doctor is added successfully", 
        doctor
    })

})