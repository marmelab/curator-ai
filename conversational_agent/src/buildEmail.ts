import { getAIPreferences } from './interestsScrapper';

export const buildResponse = async (body: any) => {
    // Generate a response from AI based on the received email text
    const aiResponse = await getAIPreferences(body['TextBody']);

    let response = `Hello!\n\n`;
    if (aiResponse?.themes[0] == null) {
        response = "Sorry, we didn't find any preferences in your E-Mail.";
    } else {
        response += `The following `
        if (aiResponse?.themes.length == 1) {
            response += `theme`;
        } else {
            response += `themes`;
        }
        response += ` have been added to your next newsletters :\n`
        aiResponse?.themes.forEach(theme => {
            response += `   - ` + theme + `\n`;
        });
    }

    response += `\n   -------- Previous Message --------\n`
    response += `   From: ` + body["From"] + `\n`;
    response += `   Sent: ` + body["Date"] + `\n`;
    response += `   To: ` + body["To"] + `\n`;
    response += `   Subject: ` + body["Subject"] + `\n\n`;
    response += body["TextBody"] + `\n`;

    return response;
};