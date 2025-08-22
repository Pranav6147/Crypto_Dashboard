import { useEffect, useMemo, useState } from 'react'
import { useCoins } from '../lib/api'
import CoinTable from '../components/CoinTable'
import Controls from '../components/Controls'
import Pagination from '../components/Pagination'
import { useCurrency } from '../context/CurrencyContext'
import { formatNumber } from '../lib/utils'

function useWatchlist(){
  const [ids, setIds] = useState<Set<string>>(()=> new Set(JSON.parse(localStorage.getItem('watchlist')||'[]')))
  useEffect(()=>{ localStorage.setItem('watchlist', JSON.stringify(Array.from(ids))) }, [ids])
  const toggle = (id:string) => setIds(prev => {
    const next = new Set(prev); next.has(id)?next.delete(id):next.add(id); return next;
  })
  return { watchIds: ids, toggle }
}

export default function Home(){
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState('market_cap_desc')
  const { data, loading, error } = useCoins({ page, perPage, search, order, sparkline: true })
  const { currency, symbol } = useCurrency()
  const { watchIds, toggle } = useWatchlist()

  const marketCap = useMemo(()=> data.reduce((a:any,c:any)=>a + (c.market_cap||0), 0), [data])
  const volume = useMemo(()=> data.reduce((a:any,c:any)=>a + (c.total_volume||0), 0), [data])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Currency</div>
          <div className="text-2xl font-semibold uppercase">{currency}</div>
        </div>
        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Page Market Cap</div>
          <div className="text-2xl font-semibold">{symbol}{formatNumber(marketCap)}</div>
        </div>
        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Page 24h Volume</div>
          <div className="text-2xl font-semibold">{symbol}{formatNumber(volume)}</div>
        </div>
        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">Auto Refresh</div>
          <div className="text-2xl font-semibold">30s</div>
        </div>
      </div>

      <Controls search={search} setSearch={setSearch} perPage={perPage} setPerPage={setPerPage} order={order} setOrder={setOrder} />

      {loading && <div className="p-8 text-center">Loading market data…</div>}
      {error && (
        <div className="p-8 text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <div className="text-sm text-neutral-500 mb-4">
            {error.includes('Rate limit') && 'The API has rate limits. Try refreshing in a few minutes.'}
            {error.includes('Network error') && 'Check your internet connection and try again.'}
            {error.includes('Server error') && 'The API server is experiencing issues. Please try again later.'}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && <CoinTable rows={data} onToggleWatch={toggle} watchIds={watchIds} />}

      <Pagination page={page} setPage={setPage} />
    </div>
  )
}
