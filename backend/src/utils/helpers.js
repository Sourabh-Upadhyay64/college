// Validate email domain
export const validateEmailDomain = (email) => {
  const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN || 'birlainstitute.co.in';
  const emailDomain = email.split('@')[1];
  
  return emailDomain === allowedDomain;
};

// Generate JWT token
export const generateToken = (id) => {
  return id;
};

// Format error response
export const formatErrorResponse = (message, errors = null) => {
  const response = {
    success: false,
    message
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return response;
};

// Format success response
export const formatSuccessResponse = (message, data = null) => {
  const response = {
    success: true,
    message
  };
  
  if (data) {
    response.data = data;
  }
  
  return response;
};
