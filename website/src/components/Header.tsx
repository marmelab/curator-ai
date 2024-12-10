import { LanguageSelector } from './LanguageSelector';

export function Header() {
  return (
    <header className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
      <div className="relative grid grid-cols-3 items-center gap-y-12 py-20 lg:static lg:py-28 xl:py-12">
        <div />

        <h1 className="text-center text-5xl font-bold">
          <span className="text-light_blue">Curator</span> <span className="text-mid_blue">AI</span>
        </h1>
        <LanguageSelector />
      </div>
    </header>
  )
}