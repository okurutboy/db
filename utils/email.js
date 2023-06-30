import nodemailer from "nodemailer";

// Create a transporter using your email service provider details
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Your email service provider SMTP host
  port: 587, // SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: false, // Set to true for SSL
  auth: {
    user: 'ikerpaster@gmail.com', // Your email address
    pass: '123' // Your email password or app-specific password
  }
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'ikerpaster@gmail.com', // Sender email address
      to, // Recipient email address
      subject,
      text,
      html: `<p>${text}</p>` // HTML version of the email body (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
