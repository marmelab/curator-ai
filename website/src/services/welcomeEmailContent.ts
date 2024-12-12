// src/services/ressources/welcomeEmailContent.ts

// Contenu du texte brut pour l'email
export const welcomeEmailText = `
Hi there! 👋

Welcome to CURATOR AI! 🎉 We’re excited to have you on board.

At CURATOR AI, we help you stay updated on your favorite topics and news with automated, AI-powered tracking.

Here’s how you can get started:
- Reply to this email with your areas of interest, preferred email frequency (daily/weekly), and any specific sources you’d like us to monitor.
- For example, you could say:
  - “I want to stay updated on AI news.”
  - “Send me a weekly digest about tech startups.”
  - “Monitor news from sources like TechCrunch.”

Let’s get started and bring your news updates to you! 🚀

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
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
    <h1 style="color: #007bff;">Hi there! 👋</h1>
    <p>Welcome to CURATOR AI! 🎉 We’re excited to have you on board.</p>
    <p>At CURATOR AI, we help you stay updated on your favorite topics and news with automated, AI-powered tracking.</p>
    <p>Here’s how you can get started:</p>
    <ul>
      <li>Reply to this email with your areas of interest, preferred email frequency (daily/weekly), and any specific sources you’d like us to monitor.</li>
      <li>For example, you could say:
        <ul>
          <li>"I want to stay updated on AI news." </li>
          <li>"Send me a weekly digest about tech startups." </li>
          <li>"Monitor news from sources like TechCrunch." </li>
        </ul>
      </li>
    </ul>
    <p>Let’s get started and bring your news updates to you! 🚀</p>
    <p>Best regards,<br>The CURATOR AI Team</p>
  </div>
</body>
</html>
`;

// Contenu CSS pour l'email (style en ligne pour compatibilité avec les clients de messagerie)
export const welcomeEmailCSS = `
/* Simple inline CSS for the email */
body {
  font-family: Arial, sans-serif;
}

h1 {
  color: #007bff;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 5px 0;
}

p {
  color: #333;
}
`;
