import Image from 'next/image'

import { CheckIcon } from '@/components/CheckIcon'
import { Container } from '@/components/Container'
import SampleImage from '@/images/SampleImage.png'
// import the i18n configuration
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next'

export function PersonalizedSection() {
  const { t } = useTranslation();  // `t` is the function to access translations
  return (
    <section
      id="free-chapters"
      aria-label="Free preview"
      className="bg-slate-200 sm:scroll-mt-32"
    >
      <div className="overflow-hidden lg:relative">
        <Container
          size="lg"
          className="relative grid grid-cols-1 items-center gap-y-12 py-20 lg:static lg:grid-cols-2 lg:py-28 xl:py-24"
        >
          <div className="flex flex-col justify-center">
            <h3 className="font-display text-base font-extrabold tracking-tight text-mid_blue sm:w-3/4 md:w-2/3 lg:w-auto">
              <Trans i18nKey="person0" />
            </h3>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-black sm:w-3/4 md:w-2/3 lg:w-auto">
              <Trans i18nKey="person1" />
            </h2>
            <p className="mt-4 text-lg tracking-tight text-black">
              <Trans i18nKey="person2" />
            </p>
            <ul role="list" className="mt-8 space-y-3">
              {[
                t('person3'),
                t('person4')
              ].map((feature) => (
                <li key={feature} className="flex">
                  <CheckIcon className="h-8 w-8 flex-none fill-blue-500" />
                  <span className="ml-4">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              className="max-w-md w-full h-auto object-cover"
              src={SampleImage}
              alt="Picture of a sample email. Each news has a title and a brief descritpion made by the AI"
            />
          </div>
        </Container>
      </div>
    </section>
  )
}