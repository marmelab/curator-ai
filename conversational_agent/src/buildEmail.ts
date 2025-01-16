import { getUserPreferences } from './getUserPreferences';

export const buildResponse = async (body: any) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(body['TextBody']);

    let response = `Hello!\n\n`;

    const emailMetadata = `
        
        -------- Previous Message --------
        
        From: ${body['From']}
        
        Sent: ${body['Date']}
        
        To: ${body['To']}
        
        Subject: ${body['Subject']}
        
        ${body['TextBody']}
    
    `;

    if (aiResponse?.themes?.length) {
        return `Sorry, we didn't find any preferences in your E-Mail. ${emailMetadata}`;
    }
    return `Hello!
    
    The following ${aiResponse?.themes.length == 1 ? 'theme' : 'themes'} have been added to your next newsletters :
    - ${aiResponse?.themes.join('\n  - ')}
    ${emailMetadata}`;
};
