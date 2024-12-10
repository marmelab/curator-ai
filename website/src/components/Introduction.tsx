'use client';  
import { useState } from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { createClient } from '@supabase/supabase-js';

// Initialisation de Supabase avec les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Introduction() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmission = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Validation de l'email
    if (!email || !validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true); // Empêche l'envoi multiple pendant le traitement

    try {
      // Vérifie si l'email existe déjà dans la table "subscribers" de Supabase
      const { data: existingEmail, error: selectError } = await supabase
        .from('subscribers')
        .select('user_email')
        .eq('user_email', email)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        setMessage(`Error: Unable to verify the email. (${selectError.message})`);
        setIsSubmitting(false);
        return;
      }

      if (existingEmail) {
        // Si l'email existe déjà
        setMessage('This email is already registered.');
        setIsSubmitting(false);
        return;
      }

      // Insère l'email dans la table "subscribers"
      const { data, error } = await supabase
        .from('subscribers')
        .insert([{ user_email: email }]);

      if (error) {
        setMessage(`Error: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      // Envoie l'email de bienvenue via l'API `WelcomingEmailAPI`
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajouter un en-tête supplémentaire si nécessaire (par exemple pour l'authentification)
        },
        body: JSON.stringify({
          recipientEmail: email,
          subject: 'Welcome to CURATOR AI!',
          textBody: 'Hi there!\n\nWelcome to CURATOR AI! We\'re excited to have you on board.',
          htmlBody: '<p>Hi there!</p><p>Welcome to CURATOR AI! We\'re excited to have you on board.</p>',
        }),
      });

      const result = await response.json();
      
      // Vérification du statut de la réponse
      if (!response.ok) {
        setMessage(`Failed to send the welcome email. ${result.error || 'Unknown error'}`);
        console.error("API Error:", result);
        return;
      }

      // Success message
      setMessage(`Email received and successfully registered: ${email}. A welcome email has been sent.`);

    } catch (error) {
      setMessage('An error occurred while registering the email.');
      console.error("Unexpected Error:", error);
    } finally {
      setIsSubmitting(false); // Réactive le bouton après traitement
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
              disabled={isSubmitting} // Désactive le bouton pendant le traitement
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </div>
        </form>

        {/* Affichage du message de confirmation */}
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </Container>
    </section>
  );
}
