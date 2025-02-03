export function generateWelcomeEmail(translations: {
  [key: string]: string;
}): string {
  const emailBody = `<!DOCTYPE html>
<html>
<head>
    <style>
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
    </style>
</head>
    <body>
      <h1 class="header">${translations.welcome}</h1>
      <p class="intro">${translations.welcome2}</p>
      <p class="content">${translations.intro}</p>

      <h2 class="subheader">${translations.instructionsHeader}</h2>
      <ul class="instructions">
        <li>${translations.instructionSubjects}</li>
        <li>${translations.instructionSites}</li>
        <li>${translations.instructionFrequency}</li>
      </ul>

      <p class="reminder">${translations.reminder}</p>
      <p class="closing">${translations.closing}</p>
      <p class="signature">${translations.signature}</p>
    </body>
</html>
`;
  return emailBody;
}
