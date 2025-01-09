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
    } else {
        console.log(
            'Email received from ' +
                body['From'] +
                ' on ' +
                body['Date'] +
                ' : \n' +
                body['TextBody']
        );

        makeEmailResponse(body);
    }
});

// Start the server
const startServer = async () => {
    app.listen(PORT, async () => {
        console.log(`Server started at http://localhost:${PORT}`);

        // Use the authtoken from the .env file
        const authtoken = process.env.NGROK_AUTH_TOKEN;

        if (!authtoken) {
            throw new Error("Ngrok authtoken is not defined in the .env file");
        }

        // Set the authtoken
        await ngrok.authtoken(authtoken);
        
        // Exposer the serveur with Ngrok
        const url = await ngrok.connect(PORT);
        console.log(`Serveur exposed with Ngrok : ${url}`);
    });
};

startServer().catch((err) => {
    console.error("Error starting Ngrok : ", err);
});
