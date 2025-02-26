import emailjs from '@emailjs/browser';

// Note: You'll need to sign up for EmailJS and get your own service ID, template ID, and public key
// Visit https://www.emailjs.com/ to create an account
const SERVICE_ID = 'service_1fzmpoj'; 
const TEMPLATE_ID = 'template_zznl7en'; 
const PUBLIC_KEY = 'reg5OKtUoEIjd_ss4'; 

interface ErrorReportData {
  email: string;
  message: string;
  errorMessage: string;
  errorStack: string;
  componentStack: string;
  userAgent: string;
  url: string;
}

/**
 * Sends an error report email using EmailJS
 * 
 * @param data Error report data
 * @returns Promise that resolves when the email is sent
 */
export const sendErrorReport = async (data: ErrorReportData): Promise<void> => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        message: data.message,
        error_message: data.errorMessage,
        error_stack: data.errorStack,
        component_stack: data.componentStack,
        user_agent: data.userAgent,
        url: data.url,
      },
      PUBLIC_KEY
    );
  } catch (error) {
    console.error('Failed to send error report:', error);
    throw error;
  }
}; 