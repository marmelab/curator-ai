import { createClient } from '@supabase/supabase-js'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Introduction } from '@/components/Introduction'
import { PersonalizedSection } from '@/components/PersonalizedSection'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

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
