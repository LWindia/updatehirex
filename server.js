import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Add a simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'HIREX API Server is running!', status: 'ok' });
});

// Add a test route for the API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

app.post('/api/send-email', async (req, res) => {
  const { fullName, companyName, designation, email, contact, interestedIn, count } = req.body;

  // Validate required fields
  if (!fullName || !companyName || !designation || !email || !contact || !interestedIn) {
    console.log('Missing required fields:', { fullName, companyName, designation, email, contact, interestedIn });
    res.status(400).json({ success: false, message: 'Missing required fields' });
    return;
  }

  // Log the incoming request for debugging
  console.log('Received form submission:', {
    fullName,
    companyName,
    designation,
    email,
    contact,
    interestedIn,
    count
  });

  // Create transporter with better error handling
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'technical@lwindia.com',
        pass: process.env.EMAIL_PASSWORD || 'eohq wlwi dgbd svxk'
      },
      // Add timeout and other options for better reliability
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000
    });

    // Verify the connection
    await transporter.verify();
    console.log('Email transporter verified successfully');
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Email service configuration error',
      details: error.message 
    });
    return;
  }

  const emailContent = `
New HIREX Interest Submission

Full Name: ${fullName}
Company Name: ${companyName}
Designation: ${designation}
Email: ${email}
Contact Number: ${contact}
Interested In: ${interestedIn === 'fulltime' ? 'Hiring Full Time' : 'Hiring Interns'}
${count ? `How many Students: ${count}` : ''}

This person has submitted their interest to hire validated, skilled tech talent at HIREX 2025.

Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim();

  const mailOptions = {
    from: process.env.EMAIL_USER || 'technical@lwindia.com',
    to: process.env.EMAIL_USER || 'technical@lwindia.com',
    replyTo: email, // Allow direct reply to the person who submitted
    subject: `New HIREX Interest Submission - ${companyName}`,
    text: emailContent,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New HIREX Interest Submission</h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Company Name:</strong> ${companyName}</p>
          <p><strong>Designation:</strong> ${designation}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Contact Number:</strong> <a href="tel:${contact}">${contact}</a></p>
          <p><strong>Interested In:</strong> ${interestedIn === 'fulltime' ? 'Hiring Full Time' : 'Hiring Interns'}</p>
          ${count ? `<p><strong>How many Students:</strong> ${count}</p>` : ''}
        </div>
        <p>This person has submitted their interest to hire validated, skilled tech talent at HIREX 2025.</p>
        <p style="color: #6b7280; font-size: 14px;">
          Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>
    `
  };

  try {
    console.log('Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check credentials.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Email service connection failed. Please try again.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email service timeout. Please try again.';
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 