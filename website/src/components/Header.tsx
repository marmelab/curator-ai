"use client"

import { Container } from '@/components/Container'
import Image from 'next/image'
import frImage from '@/images/frImage.png'
import enImage from '@/images/enImage.png'
import i18next from '@/i18n';
import { Trans } from 'react-i18next'
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();  // `t` is the function to access translations

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
    // window.location.reload();
  }

  return (
    <header className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
      <Container
        size="lg"
        className="relative grid grid-cols-1 items-center gap-y-12 py-20 lg:static lg:grid-cols-3 lg:py-28 xl:py-12"
      >
        <div></div>
        <h1 className="text-center text-5xl font-bold">
          <span className="text-light_blue">Curator</span> <span className="text-mid_blue">AI</span>
        </h1>
        <div className="flex flex-col justify-center">
          <button onClick={() => changeLanguage('en')} className="flex justify-center lg:justify-end lg\:max-w-7xl mx-2 p-2">
            <div className="pr-4"><Trans i18nKey="english" /></div>
            <Image
              className="max-w-md h-auto object-cover"
              src={enImage}
              alt={t('englishFlag')}
            />
          </button>
          <button onClick={() => changeLanguage('fr')} className="flex justify-center lg:justify-end lg\:max-w-7xl mx-2 p-2">
            <div className="pr-4"><Trans i18nKey="french" /></div>
            <Image
              className="max-w-md h-auto object-cover"
              src={frImage}
              alt={t('frenchFlag')}
            />
          </button>
        </div>
      </Container>
    </header>
  )
}
