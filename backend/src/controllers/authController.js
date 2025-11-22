import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateOTP, sendOTPEmail, sendWelcomeEmail } from '../utils/emailService.js';
import { validateEmailDomain, formatErrorResponse, formatSuccessResponse } from '../utils/helpers.js';

// @desc    Register new user & send OTP
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json(
        formatErrorResponse('Please provide all required fields: name, email, and password')
      );
    }

    // Validate email domain
    if (!validateEmailDomain(email)) {
      return res.status(403).json(
        formatErrorResponse(
          `Only users with @${process.env.ALLOWED_EMAIL_DOMAIN} email addresses can register`
        )
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json(
        formatErrorResponse('User with this email already exists and is verified')
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 10) * 60 * 1000);

    let user;
    
    if (existingUser && !existingUser.isVerified) {
      // Update existing unverified user
      user = existingUser;
      user.name = name;
      user.password = password;
      user.phone = phone || '';
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        password,
        phone: phone || '',
        otp,
        otpExpiry,
        isVerified: false
      });
    }

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, name);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Delete user if email fails
      await User.findByIdAndDelete(user._id);
      return res.status(500).json(
        formatErrorResponse('Failed to send verification email. Please try again.')
      );
    }

    res.status(201).json(
      formatSuccessResponse(
        'Registration successful! Please check your email for the OTP.',
        {
          userId: user._id,
          email: user.email,
          otpExpiresIn: `${process.env.OTP_EXPIRE_MINUTES || 10} minutes`
        }
      )
    );
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json(
      formatErrorResponse('Server error during registration. Please try again.')
    );
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json(
        formatErrorResponse('Please provide email and OTP')
      );
    }

    // Find user with OTP
    const user = await User.findOne({ email }).select('+otp +otpExpiry');

    if (!user) {
      return res.status(404).json(
        formatErrorResponse('User not found')
      );
    }

    if (user.isVerified) {
      return res.status(400).json(
        formatErrorResponse('Email already verified. Please login.')
      );
    }

    // Check if OTP is valid
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json(
        formatErrorResponse('No OTP found. Please request a new one.')
      );
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json(
        formatErrorResponse('OTP has expired. Please request a new one.')
      );
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json(
        formatErrorResponse('Invalid OTP. Please try again.')
      );
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Don't fail the verification if welcome email fails
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json(
      formatSuccessResponse(
        'Email verified successfully! Welcome to Bicycle Marketplace.',
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
            role: user.role
          }
        }
      )
    );
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json(
      formatErrorResponse('Server error during OTP verification. Please try again.')
    );
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(
        formatErrorResponse('Please provide email')
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(
        formatErrorResponse('User not found')
      );
    }

    if (user.isVerified) {
      return res.status(400).json(
        formatErrorResponse('Email already verified. Please login.')
      );
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 10) * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, user.name);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return res.status(500).json(
        formatErrorResponse('Failed to send OTP email. Please try again.')
      );
    }

    res.status(200).json(
      formatSuccessResponse(
        'OTP has been resent to your email.',
        {
          email: user.email,
          otpExpiresIn: `${process.env.OTP_EXPIRE_MINUTES || 10} minutes`
        }
      )
    );
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        formatErrorResponse('Please provide email and password')
      );
    }

    // Find user with password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json(
        formatErrorResponse('Invalid email or password')
      );
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json(
        formatErrorResponse('Please verify your email before logging in. Check your inbox for the OTP.')
      );
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json(
        formatErrorResponse('Invalid email or password')
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json(
      formatSuccessResponse(
        'Login successful!',
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
            role: user.role,
            profilePicture: user.profilePicture
          }
        }
      )
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(
      formatErrorResponse('Server error during login. Please try again.')
    );
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json(
        formatErrorResponse('User not found')
      );
    }

    res.status(200).json(
      formatSuccessResponse(
        'User data retrieved successfully',
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isVerified: user.isVerified,
            role: user.role,
            profilePicture: user.profilePicture,
            createdAt: user.createdAt
          }
        }
      )
    );
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};
