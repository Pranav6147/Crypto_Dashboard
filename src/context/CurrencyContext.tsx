import { createContext, useContext, useState } from 'react'

type Currency = 'usd' | 'inr' | 'eur'
type CurrencyCtx = { currency: Currency, setCurrency: (c: Currency) => void, symbol: string }
const Ctx = createContext<CurrencyCtx>({ currency: 'usd', setCurrency: () => {}, symbol: '$' })

const symbols: Record<Currency, string> = { usd: '$', inr: '₹', eur: '€' }

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => (localStorage.getItem('currency') as Currency) || 'usd')
  const symbol = symbols[currency]
  const setter = (c: Currency) => { setCurrency(c); localStorage.setItem('currency', c) }
  return <Ctx.Provider value={{ currency, setCurrency: setter, symbol }}>{children}</Ctx.Provider>
}

export const useCurrency = () => useContext(Ctx)
