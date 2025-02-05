'use server';

import { generateWelcomeEmail } from '@/services/welcomeEmailContent';
import { Client } from 'postmark';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

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

  const postmarkApiToken = process.env.NEXT_PUBLIC_POSTMARK_API_KEY!;
  const defaultSenderEmail = process.env.NEXT_PUBLIC_DEFAULT_POSTMARK_MAIL!;
  const defaultInboundEmail = process.env.NEXT_PUBLIC_INBOUND_POSTMARK_MAIL!;
  console.log('postmarkApiToken: ' + postmarkApiToken);
  console.log('defaultSenderEmail: ' + defaultSenderEmail);
  if (!postmarkApiToken || !defaultSenderEmail) {
    throw new Error('Missing Postmark API token or default sender email');
  }
  const client = new Client(postmarkApiToken);
  const emailData = {
    From: defaultSenderEmail,
    To: recipientEmail,
    ReplyTo: defaultInboundEmail,
    Subject: subject,
    TextBody: textBody,
    HtmlBody: htmlBody,
  };

  // Sending Email via Postmark API
  try {
    const response = await client.sendEmail(emailData);
    if (response && response.ErrorCode) {
      throw new Error(`Postmark Error: ${response.Message}`);
    }
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error in sending email:', error);
    throw new Error('Error sending email');
  }
}
