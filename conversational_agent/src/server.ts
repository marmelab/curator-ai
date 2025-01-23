import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { sendMail } from './sendEmail';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

const app = express();
const PORT = 3000;

// Middleware to parse requests as JSON
app.use(express.json());

// Webhook to receive incoming emails
app.post('/webhook', async (req: Request, res: Response) => {
    res.status(200).send('Webhook received');

    const body = req.body;
    const isSpam = req.headers['X-Spam-Status'];

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanBodyFrom = purify.sanitize(body['From']);
    const cleanBodyDate = purify.sanitize(body['Date']);
    const cleanBodyTextBody = purify.sanitize(body['TextBody']);

    if (isSpam) {
        console.log('Spam received from ' + body['From']);
        return;
    }
    console.log(
        `Received email from ${cleanBodyFrom} on ${cleanBodyDate} : 
${cleanBodyTextBody}`
    );

    // Send a reply email with the content generated by OpenAI
    await sendMail(body);
});

// Start the server
app.listen(PORT);
