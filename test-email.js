import nodemailer from 'nodemailer';

async function testEmail() {
  console.log('Testing email configuration...');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'technical@lwindia.com',
      pass: process.env.EMAIL_PASSWORD || 'eohq wlwi dgbd svxk'
    }
  });

  try {
    // Verify connection
    console.log('Verifying connection...');
    await transporter.verify();
    console.log('✅ Connection verified successfully!');
    
    // Send test email
    console.log('Sending test email...');
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'technical@lwindia.com',
      to: process.env.EMAIL_USER || 'technical@lwindia.com',
      subject: 'Test Email from HIREX Form',
      text: 'This is a test email to verify the email configuration is working.',
      html: '<h2>Test Email</h2><p>This is a test email to verify the email configuration is working.</p>'
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Error details:', error);
  }
}

testEmail(); 