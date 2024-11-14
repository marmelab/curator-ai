
// Function to load the translation JSON file based on selected language
async function loadTranslations(lang) {
    try {
        const path = window.location.pathname; // Give you the part of the URL that corresponds to the path
        const pageNameWithoutExtension = path.split('/').pop().replace(/\.[^/.]+$/, ""); // Gets the last part of the URL path and removes the file extension
        const response = await fetch(`/locales/${lang}/${pageNameWithoutExtension}.json`);
        const translations = await response.json();
        return translations;
    } catch (error) {
        console.error("Could not load translation file:", error);
        return {};
    }
}

// Function to apply translations to elements with data-i18n and data-i18n-placeholder
async function setLanguage(lang) {

    const translations = await loadTranslations(lang);
    // Change the language tag element in bold
    localStorage.setItem('language', lang);
    let nLink = document.querySelector('[data-lang="' + lang + '"]');
    nLink.classList.add("font-bold");


    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.innerHTML = translations[key];
        }
    });

    // Update elements with data-i18n-placeholder attribute (e.g., input placeholders)
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            el.placeholder = translations[key];
        }
    });

    // Update elements with data-i18n-alt attribute (e.g., img alt)
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
        const key = el.getAttribute('data-i18n-alt');
        if (translations[key]) {
            el.alt = translations[key];
        }
    });
}

async function changeLanguage(lang) {
    const old_lang = localStorage.getItem('language') || 'en';
    if (old_lang != lang) {
        await setLanguage(lang, old_lang);
    }
}

/** Set the language when loaded */
window.addEventListener('DOMContentLoaded', async () => {
    // Set the default language on page load
    const userPreferredLanguage = localStorage.getItem('language'); //retrieves the current language
    setLanguage('en');
    let nLink = document.querySelector('[data-lang="' + userPreferredLanguage + '"]');
    nLink.classList.add("font-bold") //sets the new language to bold
    localStorage.setItem('language', userPreferredLanguage);

});

function goToMain() {
    window.location.assign("index.html");
}
