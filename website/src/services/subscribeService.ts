import { createClient } from '@supabase/supabase-js';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

// Initialize Supabase with environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { validateEmail } from '@/utils/validateEmail';
/**
 * Handles the logic for subscribing an email, including validation.
 * @param email - The email address to subscribe.
 */
export async function handleSubscription(email: string): Promise<void> {
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  try {
    // Check if the email already exists in the "subscribers" table
    const { data: existingEmail, error: selectError } = await supabase
      .from('subscribers')
      .select('user_email')
      .eq('user_email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      const window = new JSDOM('').window;
      const purify = DOMPurify(window);
      const cleanErrorCode = purify.sanitize(selectError.code);
      const cleanErrorMessage = purify.sanitize(selectError.message);
      throw new Error(
        `Error verifying email ${cleanErrorCode}: ${cleanErrorMessage}`,
      );
    }

    if (existingEmail) {
      throw new Error('Email already registered.');
    }

    // Insert the email into the "subscribers" table
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ user_email: email }]);

    if (insertError) {
      const window = new JSDOM('').window;
      const purify = DOMPurify(window);
      const cleanErrorMessage = purify.sanitize(insertError.message);
      throw new Error(`Error inserting email: ${cleanErrorMessage}`);
    }

    console.log('Email successfully registered.');
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
}
