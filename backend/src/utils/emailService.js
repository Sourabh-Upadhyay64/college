import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API client
let apiInstance = null;
const getBrevoInstance = () => {
  if (!apiInstance && process.env.BREVO_API_KEY && process.env.BREVO_API_KEY !== 'demo') {
    apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
  }
  return apiInstance;
};

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email using Brevo
export const sendOTPEmail = async (email, otp, name = 'User') => {
  try {
    // For demo/testing without API key, just log the OTP
    if (!process.env.BREVO_API_KEY || process.env.BREVO_API_KEY === 'demo' || process.env.BREVO_API_KEY === '') {
      console.log('='.repeat(60));
      console.log('📧 EMAIL SIMULATION MODE (Set BREVO_API_KEY for real emails)');
      console.log('='.repeat(60));
      console.log(`To: ${email}`);
      console.log(`Name: ${name}`);
      console.log(`OTP CODE: ${otp}`);
      console.log(`Valid for: ${process.env.OTP_EXPIRE_MINUTES || 10} minutes`);
      console.log('='.repeat(60));
      return { success: true, simulated: true };
    }

    const apiInstance = getBrevoInstance();
    if (!apiInstance) {
      throw new Error('Brevo instance could not be initialized');
    }

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: 'Bicycle Marketplace', email: process.env.BREVO_SENDER_EMAIL || 'noreply@example.com' };
    sendSmtpEmail.to = [{ email: email, name: name }];
    sendSmtpEmail.subject = 'Email Verification - OTP';
    sendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚲 Bicycle Marketplace</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Thank you for signing up with Bicycle Marketplace. To complete your registration, please verify your email address.</p>
              
              <div class="otp-box">
                <p style="margin: 0; font-size: 14px; color: #666;">Your OTP Code</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">Valid for ${process.env.OTP_EXPIRE_MINUTES || 10} minutes</p>
              </div>
              
              <p>Please enter this code on the verification page to activate your account.</p>
              
              <div class="warning">
                <strong>⚠️ Security Note:</strong> Never share this OTP with anyone. Our team will never ask for your OTP.
              </div>
              
              <p>If you didn't request this verification, please ignore this email.</p>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} Bicycle Marketplace. All rights reserved.</p>
                <p>This is an automated email, please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('OTP Email sent via Brevo to:', email);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending OTP email:', error.message || error);
    throw new Error('Failed to send OTP email: ' + (error.message || 'Unknown error'));
  }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, name) => {
  try {
    // Skip if in demo mode or no API key
    if (!process.env.BREVO_API_KEY || process.env.BREVO_API_KEY === 'demo' || process.env.BREVO_API_KEY === '') {
      console.log(`📧 Welcome email simulated for: ${email}`);
      return;
    }

    const apiInstance = getBrevoInstance();
    if (!apiInstance) {
      console.log('Brevo instance not available, skipping welcome email');
      return;
    }

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: 'Bicycle Marketplace', email: process.env.BREVO_SENDER_EMAIL || 'noreply@example.com' };
    sendSmtpEmail.to = [{ email: email, name: name }];
    sendSmtpEmail.subject = 'Welcome to Bicycle Marketplace! 🎉';
    sendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea; }
            .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome Aboard!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}!</h2>
              <p>Your email has been verified successfully. Welcome to Bicycle Marketplace - your trusted platform for buying and selling bicycles!</p>
              
              <h3>What you can do now:</h3>
              <div class="feature">
                <strong>🔍 Browse Listings</strong><br>
                Explore a wide range of bicycles from verified sellers.
              </div>
              <div class="feature">
                <strong>💰 Sell Your Bicycle</strong><br>
                List your bicycle and connect with interested buyers.
              </div>
              <div class="feature">
                <strong>💬 Chat with Sellers</strong><br>
                Communicate directly with buyers and sellers.
              </div>
              <div class="feature">
                <strong>👤 Complete Your Profile</strong><br>
                Add more details to build trust in our community.
              </div>
              
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}" class="cta-button">Get Started</a>
              </p>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} Bicycle Marketplace. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Welcome email sent via Brevo to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error as this is not critical
  }
};
