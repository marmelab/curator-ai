export const welcomeEmailText = `
Welcome to Curator AI!

Curator AI is here to simplify your information tracking. With our AI, you'll receive a newsletter containing summarized and curated articles based on your preferred topics and sources. Here's how to interact with us:

### 📚 Add topics:
*I want to follow the topics AI and health.*

### 🌐 Add sites:
*Add https://www.lemonde.fr/ to my sources.*

### ⏰ Set delivery schedule:
*Send me the newsletter every Monday at 8 AM.*

By default, you will receive your first newsletter within 5 minutes, and then once a week on the same day and time as your registration.

Need help or want to make changes? Just email us anytime.

Happy exploring!  
The Curator AI Team 🚀
`;


export const welcomeEmailHTML = `
<!DOCTYPE html>
<html>
<head>
    STYLE TOKEN
</head>
<body>
    <div class="email-container">
        <h1 class="header">Welcome to Curator AI!</h1>
        <p class="intro">We're thrilled to have you on board 🎉.</p>
        <p class="content">
            With our AI, you'll receive a personalized newsletter containing the most relevant articles, summarized and tailored to your preferences.
        </p>
        <h2 class="subheader">How to interact with Curator AI?</h2>
        <ul class="instructions">
            <li> 📚 Add topics: <strong>"I want to follow the topics AI and health."</strong></li>
            <li> 🌐 Add a site: <strong>"Add https://www.lemonde.fr/ to my sources."</strong></li>
            <li> ⏰ Set delivery schedule: <strong>"Send me the newsletter every Monday at 8 AM."</strong></li>
        </ul>
        <p class="reminder">
            📩 Your first newsletter will be sent within 5 minutes of signing up. By default, future newsletters will arrive weekly at the same time as your registration.
        </p>
        <p class="closing">
            For any questions or changes, just reply to this email. Happy exploring!
        </p>
        <p class="signature">The Curator AI Team 🚀</p>
    </div>
</body>
</html>
`;

export const welcomeEmailCSS = `
body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
}

.email-container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #333333;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
}

.header {
    color: #4CAF50;
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
}

.intro, .content, .reminder, .closing {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 20px;
    color: #555555;
}

.subheader {
    font-size: 20px;
    color: #FF5722;
    margin-top: 30px;
    margin-bottom: 15px;
}

.instructions {
    list-style-type: none;
    padding: 0;
}

.instructions li {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 1.5;
}

.instructions li strong {
    color: #1E88E5;
}

.reminder {
    font-style: italic;
    color: #777777;
}

.signature {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    margin-top: 30px;
}
`;
