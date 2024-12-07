'use client'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Introduction } from '@/components/Introduction'
import { PersonalizedSection } from '@/components/PersonalizedSection'
import '@/i18n';  // Import the i18n configuration

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
