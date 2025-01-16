import { getUserPreferences } from '../getUserPreferences';
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

    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(userMail);

    if (!aiResponse?.themes?.length) {
        console.log(`Hello!
Sorry, we didn't find any preferences in your E-Mail.`);
    } else {
        console.log(`Hello!
The following ${aiResponse?.themes.length == 1 ? 'theme' : 'themes'} have been added to your next newsletters :
- ${aiResponse?.themes.join('\n  - ')}`);
    }
})();
