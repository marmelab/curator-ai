import Image from 'next/image'
import i18next from '@/i18n';
import { useTranslation , Trans } from 'react-i18next';
import { CheckIcon } from '@/components/CheckIcon'
import { Container } from '@/components/Container'
import StarIcon from '@/components/StarIcon'
import SampleImage from '@/images/SampleImage.png'
import AdEverywhere from '@/images/AdEverywhere.png'
import Arrow from '@/images/Arrow.png'

export function WhySection() {
    const { t } = useTranslation();  // `t` is the function to access translations
  
    const changeLanguage = (lng: string) => {
      i18next.changeLanguage(lng);
      // window.location.reload();
    }
  
    return (
        <section
        id="why"
        aria-label="Why use CuratorAI"
        className="sm:scroll-mt-32"
      >
        <div className="overflow-hidden lg:relative">
          <Container
            size="lg"
            className="relative grid grid-cols-1 items-center gap-y-12 py-20 lg:static lg:py-28 xl:py-24"
          >

            <div className="flex flex-col justify-center items-center">
              <h3 className="font-display text-base font-extrabold tracking-tight text-mid_blue sm:w-3/4 md:w-2/3 lg:w-auto">
                <Trans i18nKey="why0" />
              </h3>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-black sm:w-3/4 md:w-2/3 lg:w-auto">
                <Trans i18nKey="why1" />
              </h2>
              <ul role="list" className="mt-8 space-y-3">
                {[
                    t('why2'),
                    t('why3'),
                    t('why4'),
                    t('why5')
                ].map((feature) => (
                  <li key={feature} className="flex">
                    <CheckIcon className="h-8 w-8 flex-none fill-blue-500" />
                    <span className="ml-4">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className='grid lg:grid-cols-3 group'>
                <div className="flex justify-center">
                <Image
                    className="max-w-lg w-full h-auto object-cover"
                    src={AdEverywhere}
                    alt={t('badWebsiteImg')}
                />
                </div>
                <Image
                  className="brightness-10 my-auto sm:hidden lg:block"
                  src={Arrow}
                  alt={t('arrow')}
                />

                <div className="relative flex justify-center">
                    <Image
                    className="max-w-lg w-full h-auto object-cover"
                    src={SampleImage}
                    alt={t('personImg')}
                    />
                    <StarIcon className="absolute top-[-13.4%] left-[67.26%] h-24 w-24 fill-black/40 group-hover:animate-grow" />
                    <StarIcon className="absolute top-[-14%] left-2/3 h-24 w-24 fill-blue-500 group-hover:animate-grow" />
                    <StarIcon className="absolute top-[67.26%] left-[-5.5%] h-12 w-12 fill-black/40 group-hover:animate-grow-100" />
                    <StarIcon className="absolute top-2/3 left-[-6%] h-12 w-12 fill-blue-500 group-hover:animate-grow-100" />
                    <StarIcon className="absolute top-[85.4%] right-[-6.4%] h-12 w-12 fill-black/40 group-hover:animate-grow-250" />
                    <StarIcon className="absolute top-[85%] right-[-6%] h-12 w-12 fill-blue-500 group-hover:animate-grow-250" />
                </div>
            </div>

            
            
            
          </Container>
        </div>
      </section>
    )
  }