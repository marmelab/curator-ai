'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

export function Introduction() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de l'email
    if (!email || !validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Appel de l'API pour gérer l'inscription
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${result.error || 'Unknown error'}`);
        return;
      }

      setMessage(`Email received and successfully registered: ${email}.`);

      // Optionnel : Appeler une autre API pour envoyer un email
      await fetch('/api/sendEmail', {
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
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessage('An error occurred while registering the email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour valider l'email
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  return (
    <section id="introduction" aria-label="Introduction" className="pb-16 pt-10">
      <Container className="text-lg text-center tracking-tight text-slate-700">
        <p className="font-display text-5xl font-bold tracking-tight text-slate-900">
          An AI-powered tool to be the best informed
        </p>
        <p className="mt-4">Want to stay updated on your favorite topics?</p>
        <form className="mt-10 px-20" onSubmit={handleEmailSubmission}>
          <h3 className="text-lg font-medium tracking-tight text-black">Try it now !</h3>
          <div className="mt-4 sm:relative sm:flex sm:items-center sm:py-0.5 sm:pr-2.5">
            <div className="relative sm:static sm:flex-auto">
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer relative z-10 w-full appearance-none bg-transparent px-4 py-2 text-base text-black placeholder:text-slate-400/70 focus:outline-none sm:py-3"
              />
              <div className="absolute inset-0 rounded-md border border-black/40 peer-focus:border-black peer-focus:ring-1 peer-focus:ring-blue-300 sm:rounded-xl" />
            </div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="mt-4 w-full sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </div>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </Container>
    </section>
  );
}
