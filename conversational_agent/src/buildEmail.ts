import { getUserPreferences } from './getUserPreferences';

export const buildResponse = async (body: any) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(body['TextBody']);

    const emailMetadata = `
        
        -------- Previous Message --------
        
        From: ${body['From']}
        
        Sent: ${body['Date']}
        
        To: ${body['To']}
        
        Subject: ${body['Subject']}
        
        ${body['TextBody']}
    
    `;

    if (!aiResponse?.themes?.length && !aiResponse?.unwanted_themes?.length) {
        return `Sorry, we didn't find any preferences in your E-Mail. ${emailMetadata}`;
    }

    let response = `Hello!\n`;
    if (aiResponse?.themes?.length) {
        response += `The following ${aiResponse?.themes.length == 1 ? 'theme' : 'themes'} have been added to your next newsletters :
  - ${aiResponse?.themes.join('\n  - ')}`;
    }

    if (aiResponse?.unwanted_themes?.length) {
        response += `\nYou will no longer be annoyed with the following ${aiResponse?.themes.length == 1 ? 'theme' : 'themes'} :
  - ${aiResponse?.unwanted_themes.join('\n  - ')}`;
    }

    return `${response}
        ${emailMetadata}`;
};
