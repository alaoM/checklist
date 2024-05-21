import nodemailer from 'nodemailer';

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // SMTP host (e.g., smtp.gmail.com for Gmail)
  port: 587, // Port for SMTP (587 for TLS, 465 for SSL)
  secure: false, // True for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // Your email address
    pass: 'your-email-password', // Your email password or app-specific password
  },
});

// Function to send a reset email
export const sendResetEmail = async (email: string, resetLink: string): Promise<void> => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Your App" <your-email@example.com>', // Sender address
      to: email, // Recipient's address
      subject: 'Password Reset', // Subject line
      text: `Reset your password by clicking the following link: ${resetLink}`, // Plain text body
      html: `<p>Reset your password by clicking the following link: <a href="${resetLink}">${resetLink}</a></p>`, // HTML body
    });

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
