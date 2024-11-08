
/** Change the language tag element in bold */
function setLanguagePreference(old_lang,lang) {
    localStorage.setItem('language', lang);
    let nLink = document.querySelector('[data-lang="' + lang + '"]');
    nLink.classList.add("font-bold");
    let oldLink = document.querySelector('[data-lang="' + old_lang + '"]');
    oldLink.classList.remove("font-bold");
}

async function changeLanguage(lang) {
    const old_lang = localStorage.getItem('language') || 'en';
    if (old_lang != lang) {
        await setLanguagePreference(old_lang,lang);
        // const path = window.location.pathname;
        // const regex = /^\/(en)\/(.*)$/;
        // const match = path.match(regex);

        // if (match) {
        //     const newPath = `/${userPreferredLanguage}/${match[2]}`;
        //     window.location.assign(newPath);
        // }
        // const langData = await fetchLanguageData(lang);
        // updateContent(langData);
    }
}

/** Set the language when loaded */
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en'; //retrieves the current language
    console.log(userPreferredLanguage);
    let nLink = document.querySelector('[data-lang="' + userPreferredLanguage + '"]');
    nLink.classList.add("font-bold") //sets the new language to bold
    localStorage.setItem('language', userPreferredLanguage);

    // const langData = await fetchLanguageData(userPreferredLanguage);
    // updateContent(langData);
});

//page managment
function signUp() {
    window.location.assign("signUp.html"); //assign is better as we can go back
}

function goToMain() {
    window.location.assign("index.html");
}

// window.signUp = signUp;  