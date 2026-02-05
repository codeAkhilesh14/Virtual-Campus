import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
        default: null
    },
    role: {
        type: String,
        enum: ["student", "educator"],
        required: true
    },
    photoUrl: {
        type: String,
        default: ""
    },
    enrolledCourses: [{ 
        type: mongoose.Schema.Types.ObjectId,  // isme course ka id store hoga
        ref: "Course" // refer to Courses model
     }],
     resetOtp: {
        type: String,
     },
     otpExpires: {
        type: Date,
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    provider: {  // add this field to differentiate normal vs Google users
        type: String,
        enum: ["local", "google"],
        default: "local"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User