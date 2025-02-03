import { getUserPreferences } from './getUserPreferences';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export const buildResponse = async (body: any) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getUserPreferences(body['TextBody']);

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const cleanBodyFrom = purify.sanitize(body['From']);
    const cleanBodyDate = purify.sanitize(body['Date']);
    const cleanBodyTo = purify.sanitize(body['To']);
    const cleanBodySubject = purify.sanitize(body['Subject']);
    const cleanBodyTextBody = purify.sanitize(body['TextBody']);
    const cleanThemes = purify.sanitize(
        aiResponse?.themes.length == 1 ? 'theme' : 'themes'
    );

    const emailMetadata = `
        
        -------- Previous Message --------
        
        From: ${cleanBodyFrom}
        
        Sent: ${cleanBodyDate}
        
        To: ${cleanBodyTo}
        
        Subject: ${cleanBodySubject}
        
        ${cleanBodyTextBody}
    
    `;

    if (!aiResponse?.themes?.length) {
        return `Sorry, we didn't find any preferences in your E-Mail. ${emailMetadata}`;
    }
    return `Hello!
    
    The following ${cleanThemes} have been added to your next newsletters :
    - ${aiResponse?.themes.join('\n  - ')}
    ${emailMetadata}`;
};
