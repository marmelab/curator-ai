import { getUserPreferences } from '../preferencesScrapper';
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

    let response = `Hello!\n\n`;

    if (!aiResponse?.themes?.length) {
        response = "Sorry, we didn't find any preferences in your E-Mail.";
    } else {
        const themeLabel = aiResponse.themes.length === 1 ? 'theme' : 'themes';
        response += `The following ${themeLabel} have been added to your next newsletters:\n`;

        aiResponse.themes.forEach(theme => {
            response += `   - ${theme}\n`;
        });
    }
    console.log(response);
})();
