import { getUserPreferences } from './getUserPreferences';

export const buildResponse = async (body: any) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(body['TextBody']);

    let response = `Hello!\n\n`;

    const emailMetadata = `
        \n   -------- Previous Message --------\n
        From: ${body['From']}\n
        Sent: ${body['Date']}\n
        To: ${body['To']}\n
        Subject: ${body['Subject']}\n\n
        ${body['TextBody']}\n
    `;
    if (aiResponse?.themes?.length) {
        return `Sorry, we didn't find any preferences in your E-Mail. ${emailMetadata}`;
    }
    response += `
        The following ${
            aiResponse?.themes.length == 1 ? 'theme' : 'themes'
        } have been added to your next newsletters :\n
        ${aiResponse?.themes.join('\n- ')}
        ${emailMetadata}
    `;

    return response;
};
