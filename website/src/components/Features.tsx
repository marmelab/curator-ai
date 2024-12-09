"use client";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon } from './CheckIcon';
import Image from 'next/image';
import sampleImage from '@/images/sampleImage.png';
import { createClient } from '@supabase/supabase-js';
import {Button} from '@/components/Button';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Features() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmission = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifie si l'email est valide avant d'envoyer à Supabase
    if (!email || !validateEmail(email)) {
      setMessage('Veuillez entrer un email valide.');
      return;
    }

    try {
      // Insertion de l'email dans la table "subscribers"
      const { data, error } = await supabase
        .from('subscribers')
        .insert([{ user_email: email }]);

      if (error) {
        setMessage(`Erreur : ${error.message}`);
        return;
      }

      // Si l'email est enregistré avec succès
      setMessage(`Email reçu et enregistré : ${email}`);
    } catch (error) {
      setMessage('Une erreur s\'est produite lors de l\'enregistrement de l\'email.');
    }

    console.log('Email soumis :', email);
  };

  // Fonction pour valider si l'email a un format correct
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
