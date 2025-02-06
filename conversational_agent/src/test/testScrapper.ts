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
    aiResponse: {
        themes: string[];
        unwantedThemes: string[];
        sources: string[];
        unwantedSources: string[];
    } | null
) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);

    const findPreferencesInTheMail =
        aiResponse?.themes?.length ||
        aiResponse?.unwantedThemes?.length ||
        aiResponse?.sources?.length ||
        aiResponse?.unwantedSources?.length;
    if (!findPreferencesInTheMail) {
        return `Hello!
Sorry, we didn't find any preferences in your E-Mail.`;
    }

    return `Hello!
${aiResponse?.themes?.length ? `The following ${purify.sanitize(aiResponse?.themes.length == 1 ? 'theme' : 'themes')} have been added to your next newsletters:\n- ${aiResponse.themes.join('\n- ')}` : ''}

${aiResponse?.unwantedThemes?.length ? `You won't have the following ${purify.sanitize(aiResponse?.themes.length == 1 ? 'theme' : 'themes')} anymore:\n- ${aiResponse.unwantedThemes.join('\n- ')}` : ''}

${aiResponse?.sources?.length ? `The following ${purify.sanitize(aiResponse?.sources.length == 1 ? 'source' : 'sources')} have been added to your next newsletters:\n- ${aiResponse.sources.join('\n- ')}` : ''}

${aiResponse?.unwantedSources?.length ? `You won't have the following ${purify.sanitize(aiResponse?.sources.length == 1 ? 'source' : 'sources')} anymore:\n- ${aiResponse.unwantedSources.join('\n- ')}` : ''}
`;
}

(async () => {
    const userMessage = await getStringFromFile(__dirname + '/myMessage.txt');

    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences('test@mail.net', userMessage);

    console.log(await formatResponse(aiResponse));
})();
