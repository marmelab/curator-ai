import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

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
        <form className='mt-10 px-20'>
          <h3 className="text-lg font-medium tracking-tight text-black">
            Try it now !
          </h3>
          <div className="mt-4 sm:relative sm:flex sm:items-center sm:py-0.5 sm:pr-2.5">
            <div className="relative sm:static sm:flex-auto">
              <input
                type="email"
                id="email-address"
                required
                aria-label="Email address"
                placeholder="Email address"
                className="peer relative z-10 w-full appearance-none bg-transparent px-4 py-2 text-base text-black placeholder:text-slate-400/70 focus:outline-none sm:py-3"
              />
              <div className="absolute inset-0 rounded-md border border-black/40  peer-focus:border-black  peer-focus:ring-1 peer-focus:ring-blue-300 sm:rounded-xl" />
            </div>
            <Button
              type="submit"
              variant='solid'
              color="blue"
              className="mt-4 w-full sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </Container>
      
    </section>
  )
}
