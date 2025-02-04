import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: './../.env' });

// Initialize Supabase with environment variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Retrieve the themes for the subscribed email
export const getThemes = async (mail: string) => {
    const { data: themesData, error: themesError } = await supabase
        .from('subscribers')
        .select('themes')
        .eq('user_email', mail)
        .single();

    if (themesError) {
        console.error(`Error retrieving themes: ${themesError.message}`);
        return null;
    }

    return themesData;
};

// Retrieve the unwnated themes for the subscribed email
export const getUnwantedThemes = async (mail: string) => {
    const { data: themesData, error: themesError } = await supabase
        .from('subscribers')
        .select('unwanted_themes')
        .eq('user_email', mail)
        .single();

    if (themesError) {
        console.error(`Error retrieving unwanted themes: ${themesError.message}`);
        return null;
    }

    return themesData;
};

function arrayDifference(a: string[], b: string[]): string[] {
    const setB = new Set(b);
    return a.filter((element: string) => !setB.has(element));
}

function arrayUnion(a: string[], b: string[]): string[] {
    const set = new Set(a);
    for (const element of b) {
        set.add(element);
    }
    return Array.from(set);
}

// Update the themes for the subscribed email
export const addThemes = async (
    themes: string[],
    unwantedThemes: string[],
    mail: string
) => {
    const oldThemes = await getThemes(mail);
    const oldUnwantedThemes = await getUnwantedThemes(mail);
    if(oldThemes == null || oldUnwantedThemes == null) {
        console.error(oldThemes, oldUnwantedThemes);
        return false;
    }

    const newThemes = arrayUnion(
        arrayDifference(oldThemes?.themes || [], unwantedThemes),
        themes
    );
    const newUnwantedThemes = arrayUnion(
        arrayDifference(oldUnwantedThemes?.unwanted_themes || [], themes),
        unwantedThemes
    );
    const { error: updateError } = await supabase
        .from('subscribers')
        .update({
            themes: newThemes,
            unwantedThemes: newUnwantedThemes,
        })
        .eq('user_email', mail);

    if (updateError) {
        console.error(`Error updating themes: ${updateError.message}`);
        return false; 
    }
    return true;
};
