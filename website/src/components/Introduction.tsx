'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { handleSubscription } from '@/services/subscribeService'; // Import subscription service
import { handleSendWelcomeEmail } from '@/services/emailService'; // Import email service

export function Introduction() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage('');

    try {
      await handleSubscription(email);

      await handleSendWelcomeEmail(email);

      setMessage(`Success! The email ${email} has been registered and a welcome email has been sent.`);
    } catch (error: any) {
      setMessage(error.message || 'An error occurred while processing your request.');
    } finally {
      setIsSubmitting(false);
    }
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
