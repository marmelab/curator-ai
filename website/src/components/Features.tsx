import { useTranslation } from 'react-i18next';
import { CheckIcon } from './CheckIcon'

export function Features() {
  const { t } = useTranslation();  // `t` is the function to access translations

  const features = [
    t('feature3'),
    t('feature4'),
    t('feature5')
  ]

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            <h1 className="mt-10 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              {t('feature1')}
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              {t('feature2')}
            </p>
            <ul role="list" className="list-none mt-8 space-y-3 text-gray-500">
              {features.map((feature) => (
                <li key={feature} className="flex">
                  <CheckIcon className="h-8 w-8 flex-none fill-cyan-700" />
                  <span className="ml-4">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            alt={t('altimg')}
            src="SampleImage.png"
            className="w-full rounded-xl bg-gray-50 object-contain lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  )
}
