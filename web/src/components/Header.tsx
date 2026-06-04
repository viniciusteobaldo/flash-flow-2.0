import logoSvg from '../assets/logo.svg'

interface HeaderProps {
  onCreateClick: () => void
}

export function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#F7F9FB] max-w-7xl m-auto flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <img src={logoSvg} alt="FlashFlow logo" className="w-9 h-9" />
        <span className="font-manrope text-[#2A3439] font-bold text-2xl tracking-tight">Flash Flow</span>
      </div>

      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 bg-purple-300 hover:bg-purple-200 text-white text-sm font-bold px-6 py-2.5 rounded-4xl transition-colors cursor-pointer"
      >
        Novo Flashcard
      </button>
    </header>
  )
}
