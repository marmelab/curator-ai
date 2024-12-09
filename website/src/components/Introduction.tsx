'use client';
import { useState } from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { createClient } from '@supabase/supabase-js'; // Importer le createClient Supabase

// Initialisation de Supabase en utilisant les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Introduction() {
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

  return (
    <section id="introduction" aria-label="Introduction" className="pb-16 pt-10">
      <Container className="text-lg text-center tracking-tight text-slate-700">
        <p className="font-display text-5xl font-bold tracking-tight text-slate-900">
          An AI-powered tool to be the best informed
        </p>
        <p className="mt-4">Want to stay updated on your favorite topics?</p>
        <p className="mt-2">Not enough time to read all your newsletters?</p>
        <p className="mt-2">Want to save time on your research?</p>
        <p className="mt-2 font-semibold">CURATOR AI is made for you</p>
        
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
      </Container>
    </section>
  );
}
