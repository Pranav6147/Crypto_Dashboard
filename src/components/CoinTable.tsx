import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { formatNumber } from '../lib/utils'
import { useCurrency } from '../context/CurrencyContext'

function Sparkline({ data }:{ data:number[] }) {
  const series = (data || []).map((y, i)=>({ i, y }))
  return (
    <div className="h-10 w-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <Line type="monotone" dataKey="y" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function CoinTable({ rows, onToggleWatch, watchIds }:{ rows:any[], onToggleWatch:(id:string)=>void, watchIds:Set<string> }) {
  const { symbol } = useCurrency()
  return (
    <div className="overflow-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-100/80 dark:bg-neutral-800/60">
          <tr className="[&>th]:px-3 [&>th]:py-3 text-left">
            <th></th>
            <th>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>Market Cap</th>
            <th>24h Vol</th>
            <th>7d</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {rows.map((c:any)=>{
            const change1h = c.price_change_percentage_1h_in_currency
            const change24h = c.price_change_percentage_24h_in_currency
            const change7d = c.price_change_percentage_7d_in_currency
            const isFav = watchIds.has(c.id)
            return (
              <tr key={c.id} className="[&>td]:px-3 [&>td]:py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                <td>
                  <button onClick={()=>onToggleWatch(c.id)} className={`p-1 rounded ${isFav?'text-yellow-500':''}`} title={isFav?'Remove from watchlist':'Add to watchlist'}>
                    <Star size={18} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                </td>
                <td>
                  <Link to={`/coin/${c.id}`} className="inline-flex items-center gap-2">
                    <img src={c.image} alt={c.name} className="h-6 w-6 rounded-full"/>
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs uppercase text-neutral-500">{c.symbol}</div>
                    </div>
                  </Link>
                </td>
                <td>{symbol}{Number(c.current_price).toLocaleString()}</td>
                <td className={change1h>0?'text-green-600':'text-red-600'}>{change1h?.toFixed(2)}%</td>
                <td className={change24h>0?'text-green-600':'text-red-600'}>{change24h?.toFixed(2)}%</td>
                <td className={change7d>0?'text-green-600':'text-red-600'}>{change7d?.toFixed(2)}%</td>
                <td>{symbol}{formatNumber(c.market_cap)}</td>
                <td>{symbol}{formatNumber(c.total_volume)}</td>
                <td><Sparkline data={c.sparkline_in_7d?.price || []} /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
