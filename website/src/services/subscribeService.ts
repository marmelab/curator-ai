"use server"

import { createClient } from '@supabase/supabase-js';
import { validateEmail } from '@/utils/validateEmail';
import dotenv from 'dotenv';
import { AppError } from '@/lib/error';

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
export async function handleSubscription(email: string): Promise<void> {
  if (!validateEmail(email)) {
    throw new AppError('Invalid email address.');
  }

  try {
    // Check if the email already exists in the "subscribers" table
    const { data: existingEmail, error: selectError } = await supabase
      .from('subscribers')
      .select('user_email')
      .eq('user_email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      throw new AppError(
        `Error verifying email ${selectError.code}: ${selectError.message}`,
      );
    }

    if (existingEmail) {
      throw new AppError('Email already registered.');
    }

    // Insert the email into the "subscribers" table
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ user_email: email }]);

    if (insertError) {
      throw new AppError(`Error inserting email: ${insertError.message}`);
    }

    console.log('Email successfully registered.');
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
}
