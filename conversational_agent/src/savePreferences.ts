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
        throw new Error(`Error retrieving themes: ${themesError.message}`);
    }

    console.log('Retrieved themes:', themesData?.themes);
    return themesData;
};

// Retrieve the themes for the subscribed email
export const getUnwantedThemes = async (mail: string) => {
    const { data: themesData, error: themesError } = await supabase
        .from('subscribers')
        .select('unwanted_themes')
        .eq('user_email', mail)
        .single();

    if (themesError) {
        throw new Error(
            `Error retrieving unwanted themes: ${themesError.message}`
        );
    }

    console.log('Retrieved unwanted themes:', themesData?.unwanted_themes);
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
    unwanted_themes: string[],
    mail: string
) => {
    const oldThemes = await getThemes(mail);
    const oldUnwantedThemes = await getUnwantedThemes(mail);
    const newThemes = arrayUnion(
        arrayDifference(oldThemes?.themes || [], unwanted_themes),
        themes
    );
    const newUnwantedThemes = arrayUnion(
        arrayDifference(oldUnwantedThemes?.unwanted_themes || [], themes),
        unwanted_themes
    );
    const { error: updateError } = await supabase
        .from('subscribers')
        .update({
            themes: newThemes,
            unwanted_themes: newUnwantedThemes,
        })
        .eq('user_email', mail);

    if (updateError) {
        throw new Error(`Error updating themes: ${updateError.message}`);
    }
};
