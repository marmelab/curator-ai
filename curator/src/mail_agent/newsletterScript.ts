import { curateAndGenerateNewsletter } from './newsletterTxtFormat';
import dotenv from 'dotenv';
import { ServerClient } from 'postmark';

dotenv.config({ path: './../.env' });

const sendMail = true;

// Calls the curateAndGenerateNewsletter function with right parameters then sends the mail
// TODO : Add all the dynamic part (newsletter parameters, email params)

async function runNewsletter() {
    const { markdown, html } = await curateAndGenerateNewsletter();

    if (!process.env.POSTMARK_API_KEY || !process.env.DEFAULT_POSTMARK_EMAIL) {
        throw new Error(
            'Make sure to define POSTMARK_SERVER_API_KEY and POSTMARK_DEFAULT_MAIL if you want to send mail'
        );
    }

    if (!sendMail) {
        console.log('Here is the current result :');
        console.log(markdown);
        return;
    }

    // Sending email :
    const client = new ServerClient(process.env.POSTMARK_API_KEY as string);

    const mail = process.env.DEFAULT_POSTMARK_EMAIL as string;

    client.sendEmail({
        From: mail,
        To: mail,
        Subject: 'Your weekly newsletter',
        HtmlBody: html,
        TextBody: markdown,
        MessageStream: 'outbound',
    });

    console.log('Newsletter email sent');
}
runNewsletter();
