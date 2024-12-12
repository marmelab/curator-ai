import { welcomeEmailText, welcomeEmailHTML, welcomeEmailCSS } from '@/services/welcomeEmailContent';

/**
 * Handles the logic for sending a welcome email.
 * @param email - The recipient's email address.
 */
export async function handleSendWelcomeEmail(email: string): Promise<void> {
  try {
    // Inject CSS into the HTML (inlined CSS for email compatibility)
    const htmlWithCss = welcomeEmailHTML.replace(
      'STYLE TOKEN',
      `<style>${welcomeEmailCSS}</style>`
    );

    // Send the email
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientEmail: email,
        subject: 'Welcome to CURATOR AI! 🚀',
        textBody: welcomeEmailText,  // Plain text body
        htmlBody: htmlWithCss,  // HTML body with inline CSS
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
