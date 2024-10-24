import { curateAndGenerateNewsletter } from './newsletter_txt_format';
import dotenv from 'dotenv';

dotenv.config();

var postmark = require("postmark");

async function runNewsletter() {
    const {json, markdown, html} = await curateAndGenerateNewsletter();
    //console.log(json);  // Affiche ou traite la newsletter ici

    // Send an email:
    var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY as string);

    client.sendEmail({
    "From": "theo.slimani2@etu.univ-lorraine.fr",
    "To": "theo.slimani2@etu.univ-lorraine.fr",
    "Subject": "Your weekly newsletter",
    "HtmlBody": html,
    "TextBody": markdown,
    "MessageStream": "outbound"
    });

}

runNewsletter();