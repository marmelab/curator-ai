// pages/api/sendEmail.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'postmark';

interface EmailRequestBody {
  recipientEmail: string;
  subject: string;
  textBody: string;
  htmlBody: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { recipientEmail, subject, textBody, htmlBody }: EmailRequestBody = req.body;

    // Validation des champs nécessaires
    if (!recipientEmail || !subject || !textBody || !htmlBody) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const postmarkApiToken = process.env.NEXT_PUBLIC_POSTMARK_API_SERVER_TOKEN;
      const defaultSenderEmail = process.env.NEXT_PUBLIC_DEFAULT_SENDING_EMAIL;

      if (!postmarkApiToken || !defaultSenderEmail) {
        return res.status(500).json({ error: 'Missing Postmark API token or default sender email' });
      }

      const client = new Client(postmarkApiToken);
      const emailData = {
        From: defaultSenderEmail,
        To: recipientEmail,
        Subject: subject,
        TextBody: textBody,
        HtmlBody: htmlBody,
      };

      // Envoi de l'email via Postmark
      const response = await client.sendEmail(emailData);
      if (response && response.ErrorCode) {
        return res.status(500).json({ error: `Postmark Error: ${response.Message}` });
      }

      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error in sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
