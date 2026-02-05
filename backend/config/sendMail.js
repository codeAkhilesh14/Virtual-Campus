import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,  // true for 465, false for other ports
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    },
});

const sendMail = async (to, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: to,
            subject: "Reset Your Password",
            html: `<h3>Your OTP for password reset is ${otp}. It is valid for 5 minutes.</h3>`,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendMail;
