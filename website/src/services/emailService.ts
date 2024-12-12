// src/services/emailService.ts

/**
 * Handles the logic for sending a welcome email.
 * @param email - The recipient's email address.
 */
export async function handleSendWelcomeEmail(email: string): Promise<void> {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: email,
          subject: 'Welcome to CURATOR AI!',
          textBody: 'Hi there!\n\nWelcome to CURATOR AI! We\'re excited to have you on board.',
          htmlBody: '<p>Hi there!</p><p>Welcome to CURATOR AI! We\'re excited to have you on board.</p>',
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send the welcome email.');
      }
    } catch (error) {
      console.error('Error while sending welcome email:', error);
      throw error; // Re-throw the error for the caller to handle.
    }
  }
  