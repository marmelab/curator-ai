import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Introduction } from '@/components/Introduction'
import { PersonalizedSection } from '@/components/PersonalizedSection'

export default function Home() {
  return (
    <>
      <Header />
      <Introduction />
      <PersonalizedSection />
      <Footer />
    </>
  )
}
