"use client"

import i18next from '@/i18n';
import { useTranslation } from 'react-i18next';

export function Header() {

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
    // window.location.reload();
  }

  return (
    <header className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
      <div className="bg-white py-4 shadow-sm">
        <h1 className="text-center text-5xl font-bold">
          <span className="text-light_blue">Curator</span> <span className="text-mid_blue">AI</span>
        </h1>
        <div>
          <button onClick={() => changeLanguage('en')} className="mx-2">English</button>
          <button onClick={() => changeLanguage('fr')} className="mx-2">Français</button>
        </div>
      </div>
    </header>
  )
}
