import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as postmark from 'postmark';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';


// Load environment variables
dotenv.config();

// Initialize the Express application
const app = express();
// Set up a specific port for the server to listen to
const port = process.env.PORT || 3000;

// The mail we use to send email to the user
const senderEmail = process.env.DEFAULT_POSTMARK_EMAIL;

// Initialize Supabase with environment variables
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY as string);
// Initialize Postmark with environment variables
const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string);

// Tells Express to serve all files in the current directory (and any subdirectories) as static files.
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON
app.use(bodyParser.json());

// Route for the root page, i.e. the Home page in english
app.get('/', (req, res) => {
    res.redirect('/en/index.html');
});

// Route to handle email submission
app.post('/submit-email', async (req, res) => {
    const email: string = req.body.email;

    try {
        // Add the email to the Supabase database
        const { data, error } = await supabase
            .from('subscribers') // Table name
            .insert([{ email }]); // Insert the email in the DB

        // Handeling errors
        if (error) {
            if (error.code === '23505') {
                // Error if the mail has been already registered
                // Pass the following message as a response
                res.status(400).json({ message: `The email ${email} is already registered.` });
            } else {
                // Other error
                // Pass the following message as a response
                res.status(500).json({ message: 'Error during registration. Please try again later.' });
            }
        } else {

            //Send the welcome email via Postmark (uncomment to enable email sending)

            // await client.sendEmail({
            //   From: senderEmail, // Use a verified email address in Postmark
            //   To: email,
            //   Subject: 'Welcome Email',
            //   TextBody: 'Thank you for signing up for our application!',
            //   HtmlBody: '<strong>Thank you for signing up for our application!</strong>',
            // });

            // Pass the following message as a response
            res.status(200).json({ message: `A welcome email has been sent to ${email} and the address has been added to the database!` });
        }

    } catch (error) {
        // Tell in the console that an error occures
        console.error('Error processing the request:', error);
        // Pass the following message as a response
        res.status(500).json({ message: 'Error during registration. Please try again later.' });
    }
});

// Route to handle email deletion
app.post('/delete-email', async (req, res) => {
    const email: string = req.body.email;
    try {

        // Check if email exists in the database
        const { data, error } = await supabase
            .from('subscribers')  // Table name
            .select('email') // Only select the email column
            .eq('email', email) // Match the email field
            .single();  // Returns the first matching row or null

        if (!data) {
            // If no data is returned, the email doesn't exist
            // Pass the following message as a response
            res.status(500).json({ message: 'Email address not found.' });
        } else
            if (error) {
                // Pass the following message as a response
                res.status(500).json({ message: 'Error during deletion. Please try again later.' });
            } else {
                // Remove the email to the Supabase database
                const { data, error } = await supabase
                    .from('subscribers') // Table name
                    .delete() // Delete the column
                    .eq('email', email) // Match the email field

                if (error) {
                    if (error.code === '23503') {
                        // If the column is referenced by an other table, we can't delete it
                        // Pass the following message as a response
                        res.status(400).json({ message: 'Cannot delete the record because it is referenced by another table.' });
                    } else {
                        // An other error occures
                        // Pass the following message as a response
                        res.status(500).json({ message: 'Error during deletion. Please try again later.' });
                    }
                } else {
                    // Pass the following message as a response
                    res.status(200).json({ message: `The email ${email} and all the preferences associated have been removed from the database !` });
                }
            }

    } catch (error) {
        // Tell in the console that an error occures
        console.error('Error processing the request:', error);
        // Pass the following message as a response
        res.status(500).json({ message: 'Error during deletion. Please try again later.' });
    }
});

// Start the server at a specific port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
