import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
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