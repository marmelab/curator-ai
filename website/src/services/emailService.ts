'use server';

import { generateWelcomeEmail } from '@/services/welcomeEmailContent';
import { Client } from 'postmark';
import dotenv from 'dotenv';
import { AppError } from '@/lib/error';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

/**
 * Handles the logic for sending a welcome email.
 * @param email - The recipient's email address.
 */
export async function handleSendWelcomeEmail(
  email: string,
  translations: { [key: string]: string },
): Promise<{ message: string; hasError: boolean }> {
  const recipientEmail = email;
  const subject = 'Welcome to CURATOR AI! 🚀';
  const htmlBody = generateWelcomeEmail(translations);
  const textBody = translations.txt;

  const postmarkApiToken = process.env.POSTMARK_API_KEY!;
  const defaultSenderEmail = process.env.DEFAULT_POSTMARK_MAIL!;
  const defaultInboundEmail = process.env.INBOUND_POSTMARK_MAIL!;
  if (!postmarkApiToken || !defaultSenderEmail) {
    return {
      message: `Missing Postmark API token or default sender email`,
      hasError: true,
    };
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
      console.log(`Postmark Error: ${response.Message}`);
      return { message: `Postmark Error`, hasError: true };
    }
    return { message: `Email sent successfully!`, hasError: false };
  } catch (error) {
    return { message: `Error sending email`, hasError: true };
  }
}
