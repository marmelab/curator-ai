import dotenv from 'dotenv';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { ServerClient } from 'postmark';
import { getUserPreferences } from './getUserPreferences';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

export const sendMail = async (body: any) => {
    // Use the Postmark API key from environment variables
    const client = new ServerClient(process.env.POSTMARK_API_KEY || '');

    try {
        const formattedBody = await buildResponse(body);
        // Send an email
        const result = await client.sendEmail({
            From: process.env.DEFAULT_POSTMARK_MAIL || '', // Replace with a verified email
            To: body['From'],
            Subject: 'Re: ' + body['Subject'],
            HtmlBody: formatHtmlBody(formattedBody),
            TextBody: formatTextBody(formattedBody),
            MessageStream: 'outbound',
        });
        console.error('E-Mail sent successfully : ', result);
    } catch (error) {
        console.error('Error when trying to send the E-Mail :', error);
    }
};

const buildResponse = async (body: any) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(body['From'], body['TextBody']);

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanBodyFrom = purify.sanitize(body['From']);
    const cleanBodyDate = purify.sanitize(body['Date']);
    const cleanBodyTo = purify.sanitize(body['To']);
    const cleanBodySubject = purify.sanitize(body['Subject']);
    const cleanBodyTextBody = purify.sanitize(body['TextBody']);
    const cleanThemes = purify.sanitize(
        aiResponse?.themes.length == 1 ? 'theme' : 'themes'
    );
    const cleanSources = purify.sanitize(
        aiResponse?.sources.length == 1 ? 'source' : 'sources'
    );
    const cleanUnwantedSources = purify.sanitize(
        aiResponse?.unwanted_sources.length == 1 ? 'source' : 'sources'
    );

    const emailMetadata = `
        
        -------- Previous Message --------
        
        From: ${cleanBodyFrom}
        
        Sent: ${cleanBodyDate}
        
        To: ${cleanBodyTo}
        
        Subject: ${cleanBodySubject}
        
        ${cleanBodyTextBody}
    
    `;

    if (!aiResponse?.themes?.length && !aiResponse?.sources?.length && !aiResponse?.unwanted_sources?.length) {
        return `Sorry, we didn't find any preferences in your E-Mail. ${emailMetadata}`;
    }
    let textThemes = '';
    if (aiResponse?.themes?.length) {
        textThemes += `The following ${cleanThemes} have been added to your next newsletters :
- ${aiResponse?.themes.join('\n  - ')}`;
    }

    let textSources = '';
    if (aiResponse?.sources?.length) {
        textSources += `The following ${cleanSources} have been added to your next newsletters :
- ${aiResponse?.sources.join('\n  - ')}`;
    }

    let textUnwantedSources = '';
    if (aiResponse?.unwanted_sources?.length) {
        textUnwantedSources += `\nYou will no longer be annoyed with the following ${cleanUnwantedSources} :
- ${aiResponse?.unwanted_sources.join('\n  - ')}`;
    }
    return `Hello!
${textThemes}
${textSources}
${textUnwantedSources}
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
function formatHtmlBody(content: string) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanContent = purify.sanitize(content).replace(/\n/g, '<br/>');
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