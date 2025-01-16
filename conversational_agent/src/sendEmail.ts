import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

let postmark = require('postmark');

export const sendMail = async (to: string, subject: string, body: string) => {
    // Use the Postmark API key from environment variables
    const client = new postmark.ServerClient(
        process.env.POSTMARK_API_KEY || ''
    );

    try {
        // Send an email
        const result = await client.sendEmail({
            From: process.env.DEFAULT_POSTMARK_MAIL, // Replace with a verified email
            To: to,
            Subject: 'Re: ' + subject,
            HtmlBody: formatMailHtmlWithCSS(body),
            TextBody: formatMailMarkdown(body),
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
function formatMailMarkdown(content: string) {
    // Mail's header

    let mail = 'Curator AI\n\n';
    mail += content;

    // Footer

    mail += '\nSee you soon for your next newsletter!\n';

    return mail;
}

/**
 * Formats the newsletter in html with style
 * @param content String : The content of the mail
 * @returns String
 */
function formatMailHtmlWithCSS(content: String) {
    // Header

    let htmlMail = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #164e63; text-align: center; font-size: 32px;">Curator AI</h1>
        <p style="font-size: 18px; text-align: center;">Incoming message :</p>
    `;

    htmlMail +=
        `
    <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">` +
        content.replace(/\n/g, '<br/>') +
        `</div>`;
    htmlMail += `<p style="font-size: 18px; text-align: center;">See you soon for your next newsletter!</p>`;
    return htmlMail;
}
