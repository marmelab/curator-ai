function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = langData[key];
    });
}

function setLanguagePreference(old_lang,lang) {
    localStorage.setItem('language', lang);
    let nLink = document.querySelector('[data-lang="' + lang + '"]');
    nLink.classList.add("font-bold");
    let oldLink = document.querySelector('[data-lang="' + old_lang + '"]');
    oldLink.classList.remove("font-bold");
}

async function fetchLanguageData(lang) {
    const response = await fetch(`/src/web/language/${lang}.json`);
    return response.json();
}

async function changeLanguage(lang) {
    const old_lang = localStorage.getItem('language') || 'en';
    if (old_lang != lang) {
        await setLanguagePreference(old_lang,lang);
        
        const langData = await fetchLanguageData(lang);
        updateContent(langData);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    let nLink = document.querySelector('[data-lang="' + userPreferredLanguage + '"]');
    nLink.classList.add("font-bold");
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});

//page managment
function signUp() {
    window.location.assign("signUp.html");
}

function goToMain() {
    window.location.assign("index.html");
}