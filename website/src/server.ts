import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';


// Load environment variables
dotenv.config();

// Initialize the Express application
const app = express();
// Set up a specific port for the server to listen to
const port = process.env.PORT || 3000;

// Tells Express to serve all files in the current directory (and any subdirectories) as static files.
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON
app.use(bodyParser.json());

// Route for the root page, i.e. the Home page in english
app.get('/', (req, res) => {
    res.redirect('/pages/index.html');
});

// Start the server at a specific port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
