// src/services/ressources/welcomeEmailContent.ts

// Contenu du texte brut pour l'email
export const welcomeEmailText = `
Hi there! 👋

Welcome to CURATOR AI! 🎉 We’re excited to have you on board. CURATOR AI is an AI-powered service designed to keep you updated on your favorite topics and news.

### Here’s how to get started:

1. **Choose your topics of interest:**
   - You can tell us which themes you'd like to follow. For example:
     - "I would like to follow topics like LLM, AI, and code."

2. **Add specific websites to monitor:**
   - You can specify websites you want to be tracked, like:
     - "Please follow the website https://www.mediapart.fr/."
     - Or add multiple websites:
       - "Please follow the websites https://www.mediapart.fr/ ; https://www.lemonde.fr/."

   > These sources are optional, but they can help keep you updated with the latest content from your favorite sites. You can also remove sites at any time in the future.

3. **Set your preferred newsletter frequency:**
   - Choose when you'd like to receive your updates. For example:
     - "I would like to receive my newsletter every Monday at 8 AM."

### That’s it! 🚀 Your personalized news feed is ready to go!

If you ever want to make changes, just reply to this email with your updated preferences, and we’ll take care of the rest.

Best regards,  
The CURATOR AI Team
`;


// Contenu HTML pour l'email
export const welcomeEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CURATOR AI</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h1 style="color: #007bff; text-align: center;">Hi there! 👋</h1>
    <p style="font-size: 18px; text-align: center;">Welcome to CURATOR AI! 🎉 We’re excited to have you on board. CURATOR AI is an AI-powered service designed to keep you updated on your favorite topics and news.</p>

    <h2 style="color: #333;">Here’s how to get started:</h2>

    <ol style="padding-left: 20px;">
      <li style="font-size: 16px;"> <strong>Choose your topics of interest:</strong> 
        <p style="font-size: 14px;">You can tell us which themes you'd like to follow. For example:</p>
        <ul style="font-size: 14px; margin-top: 0;">
          <li>"I would like to follow topics like LLM, AI, and code."</li>
        </ul>
      </li>

      <li style="font-size: 16px;"> <strong>Add specific websites to monitor:</strong> 
        <p style="font-size: 14px;">You can specify websites you want to be tracked, like:</p>
        <ul style="font-size: 14px; margin-top: 0;">
          <li>"Please follow the website https://www.mediapart.fr/."</li>
          <li>"Please follow the websites https://www.mediapart.fr/ ; https://www.lemonde.fr/."</li>
        </ul>
        <p style="font-size: 14px;">These sources are optional, but they can help keep you updated with the latest content from your favorite sites. You can also remove sites at any time in the future.</p>
      </li>

      <li style="font-size: 16px;"> <strong>Set your preferred newsletter frequency:</strong>
        <p style="font-size: 14px;">Choose when you'd like to receive your updates. For example:</p>
        <ul style="font-size: 14px; margin-top: 0;">
          <li>"I would like to receive my newsletter every Monday at 8 AM."</li>
        </ul>
      </li>
    </ol>

    <p style="font-size: 16px;">That’s it! 🚀 Your personalized news feed is ready to go!</p>
    <p style="font-size: 14px;">If you ever want to make changes, just reply to this email with your updated preferences, and we’ll take care of the rest.</p>

    <p style="font-size: 14px; color: #555;">Best regards,<br>The CURATOR AI Team</p>
  </div>
</body>
</html>
`;

// Contenu CSS pour l'email
export const welcomeEmailCSS = `
/* Simple inline CSS for the email */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

h1 {
  color: #007bff;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 18px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 5px 0;
}

ol {
  padding-left: 20px;
}

ol li {
  font-size: 16px;
  margin-bottom: 15px;
}

p {
  font-size: 14px;
  color: #333;
}

p strong {
  color: #333;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

div {
  max-width: 600px;
  margin: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
`;

