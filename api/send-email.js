import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
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

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'technical@lwindia.com',
        pass: process.env.EMAIL_PASSWORD || 'eohq wlwi dgbd svxk'
      }
    });

    // Verify the connection
    await transporter.verify();
    console.log('Email transporter verified successfully');

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
      replyTo: email,
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
} 