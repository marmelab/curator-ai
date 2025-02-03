import { getUserPreferences } from '../getUserPreferences';
import { promises as fs } from 'fs';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

async function getStringFromFile(filePath: string): Promise<string> {
    try {
        const data = await fs.readFile(filePath, 'utf-8'); // Read file as string
        return data;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

async function formatResponse(aiResponse: { themes: string[] } | null) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanThemes = purify.sanitize(
        aiResponse?.themes.length == 1 ? 'theme' : 'themes'
    );
    if (!aiResponse?.themes?.length) {
        return `Hello!
Sorry, we didn't find any preferences in your E-Mail.`;
    }
    return `Hello!
The following ${cleanThemes} have been added to your next newsletters :
- ${aiResponse?.themes.join('\n  - ')}`;
}

(async () => {
    let userMail = await getStringFromFile(__dirname + '/myMessage.txt');

    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(userMail);

    console.log(await formatResponse(aiResponse));
})();
