// src/pages/api/subscribe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { validateEmail } from '@/utils/validateEmail'; // Import the utility

// Initialize Supabase with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Use the utility for email validation
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    try {
      // Check if the email already exists in the "subscribers" table
      const { data: existingEmail, error: selectError } = await supabase
        .from('subscribers')
        .select('user_email')
        .eq('user_email', email)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        return res
          .status(500)
          .json({ error: `Error verifying email: ${selectError.message}` });
      }

      if (existingEmail) {
        return res.status(409).json({ error: 'Email already registered.' });
      }

      // Insert the email into the "subscribers" table
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{ user_email: email }]);

      if (insertError) {
        return res
          .status(500)
          .json({ error: `Error inserting email: ${insertError.message}` });
      }

      return res
        .status(200)
        .json({ message: 'Email successfully registered.' });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Unexpected error occurred.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
