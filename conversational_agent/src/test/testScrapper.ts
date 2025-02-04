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

async function formatResponse(
    aiResponse: { themes: string[]; unwanted_themes: string[] } | null
) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanThemes = purify.sanitize(
        aiResponse?.themes.length == 1 ? 'theme' : 'themes'
    );
    console.log(aiResponse);

    if (aiResponse == null) {
        return `Sorry, we couldn't find you in our database.`;
    }

    if (!aiResponse?.themes?.length) {
        return `Hello!
Sorry, we didn't find any preferences in your E-Mail.`;
    }

    let textThemes = '';
    if (aiResponse?.themes?.length) {
        textThemes += `The following ${cleanThemes} have been added to your next newsletters :
- ${aiResponse?.themes.join('\n  - ')}`;
    }

    let textUnwantedThemes = '';
    if (aiResponse?.unwanted_themes?.length) {
        textUnwantedThemes += `\nYou will no longer be annoyed with the following ${cleanThemes} :
- ${aiResponse?.unwanted_themes.join('\n  - ')}`;
    }
    return `Hello!
${textThemes}
${textUnwantedThemes}`;
}

(async () => {
    let userMessage = await getStringFromFile(__dirname + '/myMessage.txt');

    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences("pierre.auguste@telecomnancy.net", userMessage);

    console.log(await formatResponse(aiResponse));
})();
