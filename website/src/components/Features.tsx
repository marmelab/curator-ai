"use client";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon } from './CheckIcon';
import Image from 'next/image';
import sampleImage from '@/images/sampleImage.png';
import { Button } from '@/components/Button';

export function Features() {
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

  const { t } = useTranslation();

  const features = [
    t('feature.check1'),
    t('feature.check2'),
    t('feature.check3'),
  ];

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            <h2 className="mt-10 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              {t('feature.title')}
            </h2>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              {t('feature.title')}
            </p>
            <ul role="list" className="mt-8 list-none space-y-3 text-gray-500">
              {features.map((feature) => (
                <li key={feature} className="flex">
                  <CheckIcon className="h-8 w-8 flex-none fill-cyan-700" />
                  <span className="ml-4">{feature}</span>
                </li>
              ))}
            </ul>
            {/* Formulaire de saisie de l'email */}
            <form className="mt-10 px-20" onSubmit={handleEmailSubmission}>
              <h3 className="text-lg font-medium tracking-tight text-black">Try it now !</h3>
              <div className="mt-4 sm:relative sm:flex sm:items-center sm:py-0.5 sm:pr-2.5">
                <div className="relative sm:static sm:flex-auto">
                  <input
                    type="email"
                    id="email-address"
                    required
                    aria-label="Email address"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Mettez à jour l'email dans l'état
                    className="peer relative z-10 w-full appearance-none bg-transparent px-4 py-2 text-base text-black placeholder:text-slate-400/70 focus:outline-none sm:py-3"
                  />
                  <div className="absolute inset-0 rounded-md border border-black/40 peer-focus:border-black peer-focus:ring-1 peer-focus:ring-blue-300 sm:rounded-xl" />
                </div>
                <Button
                  type="submit"
                  variant="solid"
                  color="blue"
                  className="mt-4 w-full sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
                >
                  Subscribe
                </Button>
              </div>
            </form>

            {/* Affichage du message de confirmation */}
            {message && <p className="mt-4 text-green-500">{message}</p>}
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            alt={t('feature.mailImgAlt')}
            src={sampleImage}
            className="w-full rounded-xl bg-gray-50 object-contain"
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}
