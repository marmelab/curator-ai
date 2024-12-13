// src/services/subscribeService.ts

import { validateEmail } from '@/utils/validateEmail'; // Import the validation utility

/**
 * Handles the logic for subscribing an email, including validation.
 * @param email - The email address to subscribe.
 */
export async function handleSubscription(email: string): Promise<void> {
  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to subscribe the email.');
    }
  } catch (error) {
    console.error('Error while subscribing email:', error);
    throw error; // Re-throw the error for the caller to handle.
  }
}
