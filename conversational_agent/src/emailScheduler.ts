import { exec } from "child_process";  
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config({ path: "./../.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Missing Supabase credentials.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const loggingActivated = true; // Set to false to disable logs

// Main
console.log("🟢 Newsletter Scheduler started... Press CTRL + C to stop.");
cron.schedule('* * * * *', checkAndSendNewsletters);

// Functions
async function getPendingNewsletters() {
  const currentISO = new Date().toISOString();
  const { data, error } = await supabase
    .from("subscribers")
    .select("id, user_email, next_newsletter, periodicity")
    .lte("next_newsletter", currentISO);
  
  if (error) {
    console.error("❌ Error fetching pending newsletters:", error);
    return [];
  }
  return data;
}

async function updateNextNewsletter(userId: number, periodicity: number) {
  const newNewsletterTimestampSeconds = Math.floor(Date.now() / 1000) + periodicity;
  const newNewsletterISO = new Date(newNewsletterTimestampSeconds * 1000).toISOString();
  
  const { error } = await supabase
    .from("subscribers")
    .update({ next_newsletter: newNewsletterISO })
    .eq("id", userId);

  if (error) {
    console.error(`❌ Error updating next newsletter for user ID ${userId}:`, error);
  } else if (loggingActivated) {
    console.log(`📅 Next newsletter for user ID ${userId} scheduled at ${newNewsletterISO}`);
  }
}

function sendNewsletter(userEmail: string) {
  if (loggingActivated) console.log(`📤 Sending newsletter to ${userEmail}...`);
  
  exec("ts-node ./conversational_agent/src/hello.ts", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error sending newsletter to ${userEmail}:`, error.message);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Stderr for ${userEmail}:`, stderr);
      return;
    }
    if (loggingActivated) console.log(`✅ Newsletter sent to ${userEmail}:`, stdout);
  });
}

async function checkAndSendNewsletters() {
  if (loggingActivated) console.log("⏳ Checking for pending newsletters at", new Date().toISOString());
  
  const pendingNewsletters = await getPendingNewsletters();
  if (!pendingNewsletters.length) {
    if (loggingActivated) console.log("✅ No newsletters to send.");
    return;
  }
  
  const nowSeconds = Math.floor(Date.now() / 1000);
  for (const subscriber of pendingNewsletters) {
    const { id, user_email, next_newsletter, periodicity } = subscriber;
    const newsletterTimestamp = Math.floor(new Date(next_newsletter).getTime() / 1000);
    
    if (newsletterTimestamp <= nowSeconds) {
      sendNewsletter(user_email);
      await updateNextNewsletter(id, periodicity);
    }
  }
}
