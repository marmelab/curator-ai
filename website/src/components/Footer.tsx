import { useTranslation } from 'react-i18next';
import { BackgroundGridPattern } from '@/components/BackgroundGridPattern'

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative pb-10 pt-5 sm:pb-24 sm:pt-14">
      <div className="absolute inset-x-0 top-0 h-32 text-slate-900/10 [mask-image:linear-gradient(white,transparent)]">
        <BackgroundGridPattern x="50%" />
      </div>
      <div className="relative text-center text-sm text-slate-600">
        <p>Copyright &copy; {new Date().getFullYear()} Marmelab</p>
        <p>{t('allRightsReserved')}</p>
      </div>
    </footer>
  )
}
