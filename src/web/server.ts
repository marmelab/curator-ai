import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as postmark from 'postmark';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Postmark and Supabase with environment variables
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY as string);
const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string);

app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.redirect('/en/index.html');
});

// Route to handle email submission
app.post('/submit-email', async (req, res) => {
    const email: string = req.body.email;

    try {
        // Add the email to the Supabase database
        const { data, error } = await supabase
            .from('subscribers')
            .insert([{ email }]);

        if (error) {
            if (error.code === '23505') {
                res.status(400).json({ message: `The email ${email} is already registered.` });
            } else {
                res.status(500).json({ message: 'Error during registration. Please try again later.' });
            }
        } else {

            // console.log('Email added to Supabase:', data);

            // //Send the welcome email via Postmark (uncomment to enable email sending)
            // await client.sendEmail({
            //   From: 'aurelien.gindre@telecomnancy.net', // Use a verified email address in Postmark
            //   To: email,
            //   Subject: 'Welcome Email',
            //   TextBody: 'Thank you for signing up for our application!',
            //   HtmlBody: '<strong>Thank you for signing up for our application!</strong>',
            // });

            res.status(200).json({ message: `A welcome email has been sent to ${email} and the address has been added to the database!` });
        }

    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).json({ message: 'Error during registration. Please try again later.' });
    }
});

// Route to handle email deletion
app.post('/delete-email', async (req, res) => {
    const email: string = req.body.email;

    try {
        // Remove the email to the Supabase database
        const { data, error } = await supabase
            .from('subscribers')
            .delete()
            .eq('email', { email })

        if (error) {
            if (error.code === '23503') {
                res.status(400).json({ message: 'Cannot delete the record because it is referenced by another table.' });
                /*} else if (data && data.length === 0) {
                    // No rows were deleted
                    res.status(404).json({ message: `No user found with email ${email}.` });*/
            } else {
                res.status(500).json({ message: 'Error during deletion. Please try again later.' });
            }
        } else {

            console.log('Email removed :', data);

            //     // Send the welcome email via Postmark (uncomment to enable email sending)
            //     // await client.sendEmail({
            //     //   From: 'your_verified_email@example.com', // Use a verified email address in Postmark
            //     //   To: email,
            //     //   Subject: 'Welcome Email',
            //     //   TextBody: 'Thank you for signing up for our application!',
            //     //   HtmlBody: '<strong>Thank you for signing up for our application!</strong>',
            //     // });

            res.status(200).json({ message: `The email ${email} and all the preferences associated have been removed from the database !` });
        }

    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).json({ message: 'Error during deletion. Please try again later.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
