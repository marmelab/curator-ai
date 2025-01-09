import { NextApiRequest, NextApiResponse } from 'next';
import { handleSendWelcomeEmail } from '@/services/emailService';

export default function sendWelcomeEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method != 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

    const { email, text, html } = req.body;
    try {
        handleSendWelcomeEmail(email, text, html);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending email' });
    }
}
