import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config({ path: "./config.env" });

// Create SMTP transporter for Gmail
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // 465 for SSL, 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.GMAIL_USERNAME, // Your Gmail address
    pass: process.env.GMAIL_PASSWORD, // Your Gmail app password
  },
  debug: true, // Enable debugging
  logger: true, // Log output to console
});

// Function to send an email
export const sendEmail = async (toEmail, subject, message) => {
  try {
    const mailOptions = {
      from: `"Agugbue Ikenna" <${process.env.GMAIL_USERNAME}>`, // Sender name and email
      to: toEmail, // Recipient email
      subject: subject, // Email subject
      text: message, // Plain text version
      html: `<p>${message}</p>`, // HTML version
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to send verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );
  return sendEmail(email, "Verify your email", htmlContent);
};

// Function to send welcome email
export const sendWelcomeEmail = async (email, name) => {
  const htmlContent = `<p>Hi ${name},</p><p>Welcome to Auth Company! We are excited to have you on board.</p>`;
  return sendEmail(email, "Welcome to Auth Company", htmlContent);
};

// Function to send password reset email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    resetURL
  );
  return sendEmail(email, "Reset your password", htmlContent);
};

// Function to send password reset success email
export const sendResetSuccessEmail = async (email) => {
  return sendEmail(
    email,
    "Password Reset Successful",
    PASSWORD_RESET_SUCCESS_TEMPLATE
  );
};
