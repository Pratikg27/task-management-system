const sgMail = require('@sendgrid/mail');

const sendEmail = async (options) => {
  try {
    console.log('🔄 Starting email send process...');
    console.log('📧 Sending to:', options.email);
    console.log('📧 From:', process.env.EMAIL_USER);
    
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Email message
    const msg = {
      to: options.email,
      from: {
        email: process.env.EMAIL_USER,
        name: 'Task Manager'
      },
      subject: options.subject,
      html: options.message,
    };

    console.log('✅ Message prepared, sending via SendGrid...');

    // Send email
    const response = await sgMail.send(msg);
    
    console.log('✅ Email sent successfully via SendGrid!');
    console.log('📧 Response status:', response[0].statusCode);
    
    return true;
  } catch (error) {
    console.error('❌ Email sending failed!');
    console.error('❌ Error:', error);
    
    if (error.response) {
      console.error('❌ SendGrid error body:', error.response.body);
    }
    
    return false;
  }
};

module.exports = sendEmail;