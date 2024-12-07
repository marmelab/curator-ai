'use client'
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import '@/i18n';  // Import the i18n configuration

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  )
}
