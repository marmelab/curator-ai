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

const COLUMN_NAME = {
    THEMES: 'themes',
    UNWANTED_THEMES: 'unwanted_themes',
    SOURCES: 'sources',
    UNWANTED_SOURCES: 'unwanted_sources',
} as const;
  
type ObjectValues<T> = T[keyof T];

type ColumnName = ObjectValues<typeof COLUMN_NAME>;

// Retrieve the data for the subscribed email
export const getColumn = async (mail: string, columnName: ColumnName) => {
    const { data: data, error: error } = await supabase
        .from('subscribers')
        .select(columnName)
        .eq('user_email', mail)
        .single();

    if (error) {
        console.error(`Error retrieving ${columnName}: ${error.message}`);
    }

    return (data as Record<ColumnName, string[]>)[columnName] || [];
};

// Retrieve the data for the subscribed email
export const getPreferencesColumns = async (mail: string) => {
    const { data: data, error: error } = await supabase
        .from('subscribers')
        .select('themes, unwanted_themes, sources, unwanted_sources')
        .eq('user_email', mail)
        .single();

    if (error) {
        console.error(`Error retrieving columns: ${error.message}`);
    }
    return data;
};

// Update the themes for the subscribed email
export const addPreferences = async (
    themes: string[],
    unwantedThemes: string[],
    sources: string[],
    unwantedSources: string[],
    mail: string
) => {
    const oldPreferences = await getPreferencesColumns(mail);

    const newThemes =
        _.union(_.difference(oldPreferences?.themes || [], unwantedThemes), themes) || [];
    const newUnwantedThemes =
        _.union(
            _.difference(oldPreferences?.unwanted_themes || [], themes),
            unwantedThemes
        ) || [];
    const newSources =
        _.union(_.difference(oldPreferences?.sources || [], unwantedSources), sources) || [];
    const newUnwantedSources =
        _.union(
            _.difference(oldPreferences?.unwanted_sources || [], sources),
            unwantedSources
        ) || [];

    const { error: updateError } = await supabase
        .from('subscribers')
        .update({
            themes: newThemes,
            unwanted_themes: newUnwantedThemes,
            sources: newSources,
            unwanted_sources: newUnwantedSources,
        })
        .eq('user_email', mail);

    if (updateError) {
        console.error(`Error updating preferences: ${updateError.message}`);
        return false;
    }
    return true;
};
