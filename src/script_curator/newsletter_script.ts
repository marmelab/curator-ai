import { curateAndGenerateNewsletter } from './newsletter_txt_format';
import dotenv from 'dotenv';

dotenv.config();

var postmark = require("postmark");

// Calls the curateAndGenerateNewsletter function with right parameters then sends the mail
// TODO : Add all the dynamic part (newsletter parameters, email params)

async function runNewsletter() {
    const {json, markdown, html} = await curateAndGenerateNewsletter();
    //console.log(markdown);  // uncomment this part and comment below to test without postmark

    // Sending email :
    var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY as string);
    var mail = process.env.DEFAULT_POSTMARK_MAIL as string;

    client.sendEmail({
    "From": mail,
    "To": mail,
    "Subject": "Your weekly newsletter",
    "HtmlBody": html,
    "TextBody": markdown,
    "MessageStream": "outbound"
    });
    console.log("Newsletter email sent")

}

runNewsletter();