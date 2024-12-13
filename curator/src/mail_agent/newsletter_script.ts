import { curateAndGenerateNewsletter } from './newsletter_txt_format';
import dotenv from 'dotenv';
import { ServerClient } from 'postmark';

dotenv.config();

const send_mail = true;

// Calls the curateAndGenerateNewsletter function with right parameters then sends the mail
// TODO : Add all the dynamic part (newsletter parameters, email params)

async function runNewsletter() {
  const { markdown, html } = await curateAndGenerateNewsletter();

  // Sending email :
  if (
    process.env.POSTMARK_SERVER_API_KEY &&
        process.env.POSTMARK_DEFAULT_MAIL &&
        send_mail
  ) {
    const client = new ServerClient(
            process.env.POSTMARK_SERVER_API_KEY as string
    );
    const mail = process.env.POSTMARK_DEFAULT_MAIL as string;

    client.sendEmail({
      From: mail,
      To: mail,
      Subject: 'Your weekly newsletter',
      HtmlBody: html,
      TextBody: markdown,
      MessageStream: 'outbound',
    });

    console.log('Newsletter email sent');
  } else {
    if (
      !process.env.POSTMARK_SERVER_API_KEY ||
            !process.env.POSTMARK_DEFAULT_MAIL
    ) {
      console.error(
        'Make sure to define POSTMARK_SERVER_API_KEY and POSTMARK_DEFAULT_MAIL if you want to send mail'
      );
    }

    console.log('Here is the current result :');
    console.log(markdown);
  }
}

runNewsletter();
