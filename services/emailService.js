import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

const config = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(config);

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
        const verificationLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;

        const emailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `
        <h1>Verification Email</h1>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
        };

        const info = await transporter.sendMail(emailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
};