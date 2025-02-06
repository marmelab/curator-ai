import dotenv from 'dotenv';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { ServerClient } from 'postmark';
import { getUserPreferences } from './getUserPreferences';
import { MailBody } from './types';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

export const sendMail = async (body: MailBody) => {
    // Use the Postmark API key from environment variables
    const client = new ServerClient(process.env.POSTMARK_API_KEY || '');
    try {
        const formattedBody = await buildResponse(body);
        // Send an email
        const result = await client.sendEmail({
            From: process.env.DEFAULT_POSTMARK_MAIL || '', // Replace with a verified email
            To: body['From'],
            Subject: 'Re: ' + body['Subject'],
            ReplyTo: body['To'],
            HtmlBody: formatHtmlBody(formattedBody),
            TextBody: formatTextBody(formattedBody),
            MessageStream: 'outbound',
        });
        console.error('E-Mail sent successfully : ', result);
    } catch (error) {
        console.error('Error when trying to send the E-Mail :', error);
    }
};

const buildResponse = async (body: MailBody) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(body['From'], body['TextBody']);

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);

    const emailMetadata = `
        
        -------- Previous Message --------
        
        From: ${purify.sanitize(body['From'])}
        
        Sent: ${purify.sanitize(body['Date'])}
        
        To: ${purify.sanitize(body['To'])}
        
        Subject: ${purify.sanitize(body['Subject'])}
        
        ${purify.sanitize(body['TextBody'])}
    
    `;

    if (!aiResponse?.themes?.length && !aiResponse?.unwantedThemes?.length) {
        return `Sorry, we didn't find any preferences in your E-Mail. ${emailMetadata}`;
    }

    return `Hello!
${aiResponse?.themes?.length ? `The following ${purify.sanitize(aiResponse?.themes.length == 1 ? 'theme' : 'themes')} have been added to your next newsletters:\n- ${aiResponse.themes.join('\n- ')}` : ''}

${aiResponse?.unwantedThemes?.length ? `You won't have the following ${purify.sanitize(aiResponse?.themes.length == 1 ? 'theme' : 'themes')} anymore:\n- ${aiResponse.unwantedThemes.join('\n- ')}` : ''}

${aiResponse?.sources?.length ? `The following ${purify.sanitize(aiResponse?.sources.length == 1 ? 'source' : 'sources')} have been added to your next newsletters:\n- ${aiResponse.sources.join('\n- ')}` : ''}

${aiResponse?.unwantedSources?.length ? `You won't have the following ${purify.sanitize(aiResponse?.sources.length == 1 ? 'source' : 'sources')} anymore:\n- ${aiResponse.unwantedSources.join('\n- ')}` : ''}

${emailMetadata}`;
};

/**
 * Formats the newsletter in Markdown
 * @param content String : The content of the mail
 * @returns String
 */
function formatTextBody(content: string) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    return `Curator AI

    ${purify.sanitize(content)}
    
    See you soon for your next newsletter!`;
}

/**
 * Formats the newsletter in html with style
 * @param content String : The content of the mail
 * @returns String
 */
function formatHtmlBody(content: string) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
  <h1 style="color: #164e63; text-align: center; font-size: 32px;">Curator AI</h1>
  <p style="font-size: 18px; text-align: center;">Incoming message :</p>
  <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
  ${purify.sanitize(content).replace(/\n/g, '<br/>')}
  </div>
  <p style="font-size: 18px; text-align: center;">See you soon for your next newsletter!</p>
`;
}
