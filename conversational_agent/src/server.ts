import express, { Request, Response } from 'express';
import ngrok from 'ngrok';
import dotenv from 'dotenv';
import { makeEmailResponse } from './automatic_mail_response';

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

    if (isSpam) {
        console.log('Spam received from ' + body['From']);
        return;
    }
    console.log(
        'Email received from ' +
            body['From'] +
            ' on ' +
            body['Date'] +
            ' : \n' +
            body['TextBody']
    );

    makeEmailResponse(body);

});

// Start the server
app.listen(PORT);
