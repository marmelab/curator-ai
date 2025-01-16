import { getUserPreferences } from './preferencesScrapper';

export const buildResponse = async (body: any) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(body['TextBody']);

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

    response += `\n   -------- Previous Message --------\n`;
    response += `   From: ` + body['From'] + `\n`;
    response += `   Sent: ` + body['Date'] + `\n`;
    response += `   To: ` + body['To'] + `\n`;
    response += `   Subject: ` + body['Subject'] + `\n\n`;
    response += body['TextBody'] + `\n`;

    return response;
};
