import { getUserPreferences } from '../getUserPreferences';
import { promises as fs } from 'fs';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { Console, log } from 'console';

async function getStringFromFile(filePath: string): Promise<string> {
    try {
        const data = await fs.readFile(filePath, 'utf-8'); // Read file as string
        return data;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

async function formatResponse(
    aiResponse: { themes: string[]; unwantedThemes: string[] } | null
) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);

    if (aiResponse == null) {
        return `Sorry, we couldn't find you in our database.`;
    }

    if (!aiResponse?.themes?.length && !aiResponse?.unwantedThemes?.length) {
        return `Hello!
Sorry, we didn't find any preferences in your E-Mail.`;
    }

    return `Hello!
${aiResponse?.themes?.length ? `The following ${purify.sanitize(aiResponse?.themes.length == 1 ? 'theme' : 'themes')} have been added to your next newsletters:\n- ${aiResponse.themes.join('\n- ')}` : ''}

${aiResponse?.unwantedThemes?.length ? `You will no longer be annoyed with the following ${purify.sanitize(aiResponse?.themes.length == 1 ? 'theme' : 'themes')}:\n- ${aiResponse.unwantedThemes.join('\n- ')}` : ''}`;
}

(async () => {
    const userMessage = await getStringFromFile(__dirname + '/myMessage.txt');

    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences('test@mail.net', userMessage);

    console.log(aiResponse);

    console.log(await formatResponse(aiResponse));
})();
