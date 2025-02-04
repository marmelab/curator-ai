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
    aiResponse: { themes: string[]; sources: string[]; unwanted_sources: string[] } | null
) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanThemes = purify.sanitize(
        aiResponse?.themes.length == 1 ? 'theme' : 'themes'
    );
    const cleanSources = purify.sanitize(
        aiResponse?.sources.length == 1 ? 'source' : 'sources'
    );
    const cleanUnwantedSources = purify.sanitize(
        aiResponse?.unwanted_sources.length == 1 ? 'source' : 'sources'
    );

    if (!aiResponse?.themes?.length && !aiResponse?.sources?.length && !aiResponse?.unwanted_sources?.length) {
        return `Hello!
Sorry, we didn't find any preferences in your E-Mail.`;
    }

    let textThemes = '';
    if (aiResponse?.themes?.length) {
        textThemes += `The following ${cleanThemes} have been added to your next newsletters :
- ${aiResponse?.themes.join('\n  - ')}`;
    }

    let textSources = '';
    if (aiResponse?.sources?.length) {
        textSources += `The following ${cleanSources} have been added to your next newsletters :
- ${aiResponse?.sources.join('\n  - ')}`;
    }

    let textUnwantedSources = '';
    if (aiResponse?.unwanted_sources?.length) {
        textUnwantedSources += `\nYou will no longer be annoyed with the following ${cleanUnwantedSources} :
- ${aiResponse?.unwanted_sources.join('\n  - ')}`;
    }
    return `Hello!
${textThemes}
${textSources}
${textUnwantedSources}`;
}

(async () => {
    const userMessage = await getStringFromFile(__dirname + '/myMessage.txt');

    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(userMessage);
    console.log(aiResponse);
    console.log(await formatResponse(aiResponse));
})();