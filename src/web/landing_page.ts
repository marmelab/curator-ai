const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const postmark = require('postmark');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
//require('dotenv').config();

const app = express();
const port = 3000;

// Initialize Postmark and Supabase with environment variables
// const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Configure body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle email submission, add the email to Supabase, and send a welcome email
// app.post('/submit-email', async (req, res) => {
//   const email = req.body.email; // Retrieve the email sent via the form

//   try {
//     // Add the email to the Supabase database
//     const { data, error } = await supabase
//       .from('subscribers')
//       .insert([{ email: email }])
//       .select(); // Retrieve the inserted data

//     if (error) {
//       // Check if the error is due to a duplicate email (duplicate key)
//       if (error.code === '23505') {
//         console.error('Error: The email is already registered:', error);
//         return res.send(`<h1>The email ${email} is already registered.</h1>`);
//       } else {
//         console.error('Error inserting into Supabase:', error);
//         return res.send('Error during registration. Please try again later.');
//       }
//     }

//     console.log('Email added to Supabase:', data);

//     // Send the welcome email via Postmark only if the registration was successful
//     await client.sendEmail({
//       "From": "louis.ferry@telecomnancy.net", // Use a verified email address in Postmark
//       "To": email,
//       "Subject": "Welcome Email",
//       "TextBody": "Thank you for signing up for our application! We are excited to have you on board.",
//       "HtmlBody": "<strong>Thank you for signing up for our application!</strong> We are excited to have you on board."
//     });

//     console.log('Email sent to:', email);
//     res.send(`<h1>A welcome email has been sent to ${email} and the address has been added to the database!</h1>`);

//   } catch (error) {
//     // Handle errors during email sending or Supabase insertion
//     console.error('Error processing the request:', error);
//     res.send('Error during registration. Please try again later.');
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});