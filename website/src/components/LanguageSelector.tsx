import Image from 'next/image'
import i18next from '@/i18n';
import { useTranslation } from 'react-i18next';
import frImage from '@/images/frImage.png'
import enImage from '@/images/enImage.png'

export function LanguageSelector() {

  const { t } = useTranslation();  // `t` is the function to access translations

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  }

  return (
    <div className="flex flex-col justify-center">
      <button onClick={() => changeLanguage('en')} className="flex justify-center lg:justify-end lg:max-w-7xl mx-2 p-2 hover:underline transform transition-transform hover:scale-105 duration-200"
        style={{ transformOrigin: 'right' }}>
        <div className="pr-4">English</div>
        <Image
          className="max-w-md h-auto object-cover"
          src={enImage}
          alt={t('englishFlag')}
        />
      </button>
      <button onClick={() => changeLanguage('fr')} className="flex justify-center lg:justify-end lg:max-w-7xl mx-2 p-2 hover:underline transform transition-transform hover:scale-105 duration-200"
        style={{ transformOrigin: 'right' }}>
        <div className="pr-4">Français</div>
        <Image
          className="max-w-md h-auto object-cover"
          src={frImage}
          alt={t('frenchFlag')}
        />
      </button>
    </div>
  )
}
