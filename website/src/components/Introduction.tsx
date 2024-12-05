import { Container } from '@/components/Container'

export function Introduction() {
  return (
    <section
      id="introduction"
      aria-label="Introduction"
      className="pb-16 pt-10"
    >
      <Container className="text-lg text-center tracking-tight text-slate-700">
        <p className="font-display text-5xl font-bold tracking-tight text-slate-900">
          An AI-powered tool to be the best informed
        </p>
        <p className="mt-4">
          Want to stay updated on your favorite topics?
        </p>
        <p className="mt-2">
          Not enough time to read all your newsletters?
        </p>
        <p className="mt-2">
          Want to save time on your research?
        </p>
        <p className="mt-2 font-semibold">
          CURATOR AI is made for you
        </p>        
      </Container>
    </section>
  )
}
