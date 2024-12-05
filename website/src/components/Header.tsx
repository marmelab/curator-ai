import { Button } from '@/components/Button'

export function Header() {
  return (
    <header className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
        <h1 className="text-center text-5xl py-5 font-bold mx-auto">
          <span className="text-light_blue">Curator</span> <span className="text-mid_blue">AI</span>
        </h1>
    </header>
  )
}
