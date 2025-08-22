import { useEffect, useState } from 'react'
import CoinTable from '../components/CoinTable'
import { useCurrency } from '../context/CurrencyContext'
import axios from 'axios'

export default function Watchlist(){
  const ids: string[] = JSON.parse(localStorage.getItem('watchlist')||'[]')
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currency } = useCurrency()

  const toggle = (id:string)=>{
    const set = new Set(ids)
    set.has(id) ? set.delete(id) : set.add(id)
    localStorage.setItem('watchlist', JSON.stringify(Array.from(set)))
    load()
  }

  async function load(){
    if(ids.length === 0){ setRows([]); setLoading(false); return }
    setLoading(true); setError(null)
    try {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: currency, ids: ids.join(','), order: 'market_cap_desc', per_page: 250, sparkline: true, price_change_percentage: '1h,24h,7d' }
      })
      setRows(data)
    } catch(e:any){ setError(e.message || 'Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [currency])

  if(loading) return <div className="p-8 text-center">Loading…</div>
  if(error) return <div className="p-8 text-center text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Watchlist</h2>
      {rows.length===0 ? <div className="p-8 text-center text-neutral-500">No coins in watchlist yet. Go to Home and star some!</div> :
        <CoinTable rows={rows} onToggleWatch={toggle} watchIds={new Set(ids)} />
      }
    </div>
  )
}
