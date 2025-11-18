const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    console.log('🔄 Starting email send process...');
    console.log('📧 Sending to:', options.email);
    console.log('📧 From:', process.env.EMAIL_USER);
    
    // Remove spaces from password
    const cleanPassword = process.env.EMAIL_PASSWORD.replace(/\s+/g, '');
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword
      }
    });

    console.log('✅ Transporter created successfully');

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Email options
    const mailOptions = {
      from: `Task Manager <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    
    return true;
  } catch (error) {
    console.error('❌ Email sending failed!');
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Full error:', error);
    return false;
  }
};

module.exports = sendEmail;