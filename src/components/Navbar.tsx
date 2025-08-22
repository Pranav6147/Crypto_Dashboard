import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Star } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCurrency } from '../context/CurrencyContext'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { currency, setCurrency } = useCurrency()
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">₿ CryptoDash</Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className={`px-3 py-1 rounded-full ${pathname==='/'?'bg-neutral-200/60 dark:bg-neutral-800':''}`}>Home</Link>
          <Link to="/watchlist" className={`px-3 py-1 rounded-full ${pathname==='/watchlist'?'bg-neutral-200/60 dark:bg-neutral-800':''}`}><div className="inline-flex items-center gap-1"><Star size={16}/> Watchlist</div></Link>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as any)}
            className="px-3 py-1 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            aria-label="Currency"
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>
          <button onClick={toggle} className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:shadow-soft" aria-label="Toggle dark mode">
            {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </nav>
      </div>
    </header>
  )
}
