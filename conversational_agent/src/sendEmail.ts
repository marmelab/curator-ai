import dotenv from 'dotenv';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { ServerClient } from 'postmark';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

export const sendMail = async (to: string, subject: string, body: string) => {
    // Use the Postmark API key from environment variables
    const client = new ServerClient(process.env.POSTMARK_API_KEY || '');

    try {
        // Send an email
        const result = await client.sendEmail({
            From: process.env.DEFAULT_POSTMARK_MAIL || '', // Replace with a verified email
            To: to,
            Subject: 'Re: ' + subject,
            HtmlBody: formatHtmlBody(body),
            TextBody: formatTextBody(body),
            MessageStream: 'outbound',
        });
        console.error('E-Mail sent successfully : ', result);
    } catch (error) {
        console.error('Error when trying to send the E-Mail :', error);
    }
};

/**
 * Formats the newsletter in Markdown
 * @param content String : The content of the mail
 * @returns String
 */
function formatTextBody(content: string) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanContent = purify.sanitize(content);
    return `Curator AI

    ${cleanContent}
    
    See you soon for your next newsletter!`;
}

/**
 * Formats the newsletter in html with style
 * @param content String : The content of the mail
 * @returns String
 */
function formatHtmlBody(content: String) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanContent = purify.sanitize(content.replace(/\n/g, '<br/>'));
    return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
  <h1 style="color: #164e63; text-align: center; font-size: 32px;">Curator AI</h1>
  <p style="font-size: 18px; text-align: center;">Incoming message :</p>
  <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
  ${cleanContent}
  </div>
  <p style="font-size: 18px; text-align: center;">See you soon for your next newsletter!</p>
`;
}
