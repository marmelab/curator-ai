'use client';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';
import '@/i18n';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
}
