import { curateAndGenerateNewsletter } from './newsletter_txt_format';

async function runNewsletter() {
    const newsletterText = await curateAndGenerateNewsletter();
    console.log(newsletterText);  // Affiche ou traite la newsletter ici
}



runNewsletter();