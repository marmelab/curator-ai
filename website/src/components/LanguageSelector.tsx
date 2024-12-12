import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '@/i18n';
import 'flag-icons/css/flag-icons.min.css';

interface FlagIconProps {
  countryCode: string;
}

function FlagIcon({ countryCode = '' }: FlagIconProps) {
  if (countryCode === 'en') {
    countryCode = 'gb';
  }

  return (
    <span
      className={`fi fis shadow-inner mr-2 inline-block h-[12px] w-[12px] rounded-full border-0 bg-white text-[12px] shadow-[rgba(0,0,0,.06)] fi-${countryCode}`}
    />
  );
}

interface Language {
  key: string;
  name: string;
}

const LANGUAGE_SELECTOR_ID = 'language-selector';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const selectedLanguage = availableLanguages.find(
    (language) => language.key === i18n.language,
  );

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language.key);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button');
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  if (!selectedLanguage) {
    return null;
  }

  return (
    <>
      <div className="z-40 flex items-center">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              id={LANGUAGE_SELECTOR_ID}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <FlagIcon countryCode={selectedLanguage.key} />
              {selectedLanguage.name}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="horizontal"
              aria-labelledby="language-selector"
            >
              <div className="grid grid-rows-2 gap-2 py-1" role="none">
                {availableLanguages.map((language, index) => {
                  return (
                    <button
                      key={language.key}
                      onClick={() => handleLanguageChange(language)}
                      className={`${
                        selectedLanguage.key === language.key
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                      } inline-flex items-center px-4 py-2 text-left text-sm hover:bg-gray-100 ${index % 2 === 0 ? 'rounded-r' : 'rounded-l'}`}
                      role="menuitem"
                    >
                      <FlagIcon countryCode={language.key} />
                      <span className="truncate">{language.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
