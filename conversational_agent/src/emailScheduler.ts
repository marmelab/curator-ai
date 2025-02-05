import { exec } from "child_process"; 
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Missing Supabase credentials.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const INTERVAL = 10000; // 10 seconds

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

async function updateNextNewsletter(userEmail: string, periodicity: number) {
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
    const newsletterTimestamp = Math.floor(new Date(next_newsletter).getTime() / 1000);
    if (newsletterTimestamp <= nowSeconds) {
      sendNewsletter(user_email);
      await updateNextNewsletter(user_email, periodicity);
    }
  }
}

console.log("🟢 Newsletter Scheduler started... Press CTRL + C to stop.");
setInterval(checkAndSendNewsletters, INTERVAL);
