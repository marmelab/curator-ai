import { getAIPreferences } from '../interestsScrapper';
import { promises as fs } from 'fs';

async function getStringFromFile(filePath: string): Promise<string> {
    try {
        const data = await fs.readFile(filePath, 'utf-8'); // Read file as string
        return data;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

(async () => {
    let userMail = await getStringFromFile(__dirname + '/myMessage.txt');

    const answ = await getAIPreferences(userMail);
    console.log(answ);
})();
