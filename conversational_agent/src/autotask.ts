import { exec } from "child_process";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Chargement des variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Missing Supabase credentials.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const INTERVAL = 10000; // Exprimé en ms

/**
 * Récupère les utilisateurs dont la newsletter doit être envoyée.
 * On sélectionne les enregistrements dont `next_newsletter` (en format ISO)
 * est inférieur ou égal à l'heure actuelle.
 * On récupère également la colonne `periodicity` qui contient la durée d'espacement en secondes.
 */
async function getPendingNewsletters() {
  const currentISO = new Date().toISOString();
  const { data, error } = await supabase
    .from("subscribers")
    .select("user_email, next_newsletter, periodicity")
    .lte("next_newsletter", currentISO);

  if (error) {
    console.error("❌ Error fetching pending newsletters:", error);
    return [];
  }
  return data;
}

/**
 * Met à jour le champ `next_newsletter` pour l'utilisateur identifié par son email.
 * Le prochain envoi est planifié en ajoutant la périodicité (en secondes) définie pour l'utilisateur
 * au moment actuel (moment de l'envoi effectif).
 * @param userEmail L'adresse email de l'utilisateur.
 * @param periodicity La durée d'espacement en secondes pour cet utilisateur.
 */
async function updateNextNewsletter(userEmail: string, periodicity: number) {
  // Utiliser le temps actuel comme base pour planifier l'envoi suivant
  const newNewsletterTimestampSeconds = Math.floor(Date.now() / 1000) + periodicity;
  const newNewsletterISO = new Date(newNewsletterTimestampSeconds * 1000).toISOString();

  const { error } = await supabase
    .from("subscribers")
    .update({ next_newsletter: newNewsletterISO })
    .eq("user_email", userEmail);

  if (error) {
    console.error(`❌ Error updating next newsletter for ${userEmail}:`, error);
  } else {
    console.log(`📅 Next newsletter for ${userEmail} scheduled at ${newNewsletterISO}`);
  }
}

/**
 * Exécute le script `hello.ts` qui se charge d'envoyer la newsletter pour un utilisateur donné.
 * @param userEmail L'adresse email de l'utilisateur.
 */
function sendNewsletter(userEmail: string) {
  console.log(`📤 Sending newsletter to ${userEmail}...`);
  exec("ts-node ./conversational_agent/src/hello.ts", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error sending newsletter to ${userEmail}:`, error.message);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Stderr for ${userEmail}:`, stderr);
      return;
    }
    console.log(`✅ Newsletter sent to ${userEmail}:`, stdout);
  });
}

/**
 * Vérifie régulièrement la base de données pour détecter les newsletters à envoyer.
 * Pour chaque utilisateur dont le `next_newsletter` est dû, le script :
 *  - Lance l'envoi de la newsletter via `hello.ts`.
 *  - Met à jour la date de la prochaine newsletter en ajoutant la périodicité définie pour cet utilisateur.
 */
async function checkAndSendNewsletters() {
  console.log("⏳ Checking for pending newsletters at", new Date().toISOString());
  const pendingNewsletters = await getPendingNewsletters();

  if (!pendingNewsletters.length) {
    console.log("✅ No newsletters to send.");
    return;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);

  for (const subscriber of pendingNewsletters) {
    const { user_email, next_newsletter, periodicity } = subscriber;
    // Convertir la date ISO en timestamp en secondes
    const newsletterTimestamp = Math.floor(new Date(next_newsletter).getTime() / 1000);
    if (newsletterTimestamp <= nowSeconds) {
      // Envoyer la newsletter
      sendNewsletter(user_email);
      // Mettre à jour la prochaine date d'envoi pour cet utilisateur
      // en utilisant la périodicité spécifiée dans la base
      await updateNextNewsletter(user_email, periodicity);
    }
  }
}

// Démarrage du scheduler
console.log("🟢 Newsletter Scheduler started... Press CTRL + C to stop.");
setInterval(checkAndSendNewsletters, INTERVAL);
