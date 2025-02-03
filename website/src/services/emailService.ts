'use server';

import { generateWelcomeEmail } from '@/services/welcomeEmailContent';
import { Client } from 'postmark';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

/**
 * Handles the logic for sending a welcome email.
 * @param email - The recipient's email address.
 */
export async function handleSendWelcomeEmail(
  email: string,
  translations: { [key: string]: string },
): Promise<void> {
  const recipientEmail = email;
  const subject = 'Welcome to CURATOR AI! 🚀';
  const htmlBody = generateWelcomeEmail(translations);
  const textBody = translations.txt;

  const postmarkApiToken = process.env.POSTMARK_API_KEY;
  const defaultSenderEmail = process.env.DEFAULT_POSTMARK_EMAIL;
  if (!postmarkApiToken || !defaultSenderEmail) {
    throw new Error('Missing Postmark API token or default sender email');
  }
  const client = new Client(postmarkApiToken);
  const emailData = {
    From: defaultSenderEmail,
    To: recipientEmail,
    Subject: subject,
    TextBody: textBody,
    HtmlBody: htmlBody,
  };

  // Sending Email via Postmark API
  try {
    const response = await client.sendEmail(emailData);
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanMessage = purify.sanitize(response.Message);
    if (response && response.ErrorCode) {
      throw new Error(`Postmark Error: ${cleanMessage}`);
    }
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error in sending email:', error);
    throw new Error('Error sending email');
  }
}
