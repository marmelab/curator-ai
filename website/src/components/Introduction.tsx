import { Container } from '@/components/Container'
// import the i18n configuration
import { useTranslation } from 'react-i18next';

export function Introduction() {
  const { t } = useTranslation();  // `t` is the function to access translations
  return (
    <section
      id="introduction"
      aria-label="Introduction"
      className="pb-16 pt-10"
    >
      <Container className="text-lg text-center tracking-tight text-slate-700">
        <p className="font-display text-5xl font-bold tracking-tight text-slate-900">
          {t('intro0')}
        </p>
        <p className="mt-4">
          {t('intro1')}
        </p>
        <p className="mt-2">
          {t('intro2')}
        </p>
        <p className="mt-2">
          {t('intro3')}
        </p>
        <p className="mt-2 font-semibold">
          {t('intro4')}
        </p>
      </Container>
    </section>
  )
}
