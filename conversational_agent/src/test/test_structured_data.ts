import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { runStructuredRequest } from '../structured_data';

dotenv.config({ path: './../.env' });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

var userMail = "I would like my newsletter to be every 2 days, I have an interest in data engineering and LLMs. Hi! How are you today ? I’ve bought an duc ! This is very funny XD. Do you think that alien lives on the moon ?Anyway, give me news about firebase and REACT please. Teach me javascript. Wait no, in fact forget it, I prefer typescript"

runStructuredRequest(openai, userMail)