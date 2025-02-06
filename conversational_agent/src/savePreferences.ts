'use-server';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import _ from 'lodash';

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
        console.error(
            `Error retrieving unwanted themes: ${themesError.message}`
        );
        return null;
    }

    return themesData;
};

// Update the themes for the subscribed email
export const addThemes = async (
    themes: string[],
    unwantedThemes: string[],
    mail: string
) => {
    const oldThemes = await getThemes(mail);
    const oldUnwantedThemes = await getUnwantedThemes(mail);
    if (oldThemes == null || oldUnwantedThemes == null) {
        console.error(oldThemes, oldUnwantedThemes);
        return false;
    }

    const newThemes = _.union(
        _.difference(oldThemes?.themes || [], unwantedThemes),
        themes
    );
    const newUnwantedThemes = _.union(
        _.difference(oldUnwantedThemes?.unwanted_themes || [], themes),
        unwantedThemes
    );
    const { error: updateError } = await supabase
        .from('subscribers')
        .update({
            themes: newThemes,
            unwanted_themes: newUnwantedThemes,
        })
        .eq('user_email', mail);

    if (updateError) {
        console.error(`Error updating themes: ${updateError.message}`);
        return false;
    }
    return true;
};

// Retrieve the sources for the subscribed email
export const getSources = async (mail: string) => {
    const { data: sourcesData, error: sourcesError } = await supabase
        .from('subscribers')
        .select('sources')
        .eq('user_email', mail)
        .single();

    if (sourcesError) {
        console.error(`Error retrieving sources: ${sourcesError.message}`);
        return null;
    }

    return sourcesData;
};

// Retrieve the unwnated sources for the subscribed email
export const getUnwantedSources = async (mail: string) => {
    const { data: sourcesData, error: sourcesError } = await supabase
        .from('subscribers')
        .select('unwanted_sources')
        .eq('user_email', mail)
        .single();

    if (sourcesError) {
        console.error(
            `Error retrieving unwanted sources: ${sourcesError.message}`
        );
        return null;
    }

    return sourcesData;
};

// Update the sources for the subscribed email
export const addSources = async (
    sources: string[],
    unwantedSources: string[],
    mail: string
) => {
    const oldSources = await getSources(mail);
    const oldUnwantedSources = await getUnwantedSources(mail);
    if (oldSources == null || oldUnwantedSources == null) {
        console.error(oldSources, oldUnwantedSources);
        return false;
    }

    const newSources = _.union(
        _.difference(oldSources?.sources || [], unwantedSources),
        sources
    );
    const newUnwantedSources = _.union(
        _.difference(oldUnwantedSources?.unwanted_sources || [], sources),
        unwantedSources
    );
    const { error: updateError } = await supabase
        .from('subscribers')
        .update({
            sources: newSources,
            unwanted_sources: newUnwantedSources,
        })
        .eq('user_email', mail);

    if (updateError) {
        console.error(`Error updating sources: ${updateError.message}`);
        return false;
    }
    return true;
};
