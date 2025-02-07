'use server';

import { createClient } from '@supabase/supabase-js';
import { validateEmail } from '@/utils/validateEmail';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

// Initialize Supabase with environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Handles the logic for subscribing an email, including validation.
 * @param email - The email address to subscribe.
 */
export async function handleSubscription(
  email: string,
): Promise<{ message: string; hasError: boolean }> {
  if (!validateEmail(email)) {
    return { message: `Invalid email address.`, hasError: true };
  }

  try {
    // Check if the email already exists in the "subscribers" table
    const { data: existingEmail, error: selectError } = await supabase
      .from('subscribers')
      .select('user_email')
      .eq('user_email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      return {
        message: `Error verifying email ${selectError.code}: ${selectError.message}`,
        hasError: true,
      };
    }

    if (existingEmail) {
      return { message: `Email already registered.`, hasError: true };
    }

    // Insert the email into the "subscribers" table
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ user_email: email }]);

    if (insertError) {
      console.error(`Error inserting email: ${insertError.message}`);
      return {
        message: `Error inserting email: ${insertError.message}`,
        hasError: true,
      };
    }

    return { message: `Email successfully registered.`, hasError: false };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { message: `Unexpected error occured`, hasError: true };
  }
}
