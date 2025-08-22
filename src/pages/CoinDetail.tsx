import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { fetchCoinDetail } from '../lib/api'
import { useCurrency } from '../context/CurrencyContext'
import { formatNumber } from '../lib/utils'

export default function CoinDetail(){
  const { id } = useParams<{ id: string }>()
  const { currency, symbol } = useCurrency()
  const [detail, setDetail] = useState<any>(null)
  const [series, setSeries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    if(!id) return
    let cancelled = false
    async function run(){
      setLoading(true); setError(null)
      try {
        const { detail, chart } = await fetchCoinDetail(id, currency)
        if(cancelled) return
        setDetail(detail)
        const points = (chart.prices || []).map((p:any)=>({ t: new Date(p[0]).toLocaleDateString(), y: p[1] }))
        setSeries(points)
      } catch(e:any){
        if(!cancelled) setError(e.message || 'Failed to load')
      } finally {
        if(!cancelled) setLoading(false)
      }
    }
    run()
    return ()=>{ cancelled = true }
  }, [id, currency])

  if (loading) return <div className="p-8 text-center">Loading…</div>
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>
  if (!detail) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <img src={detail.image?.small} className="h-10 w-10" />
        <div>
          <div className="text-2xl font-semibold">{detail.name} <span className="text-neutral-500 text-base">({detail.symbol?.toUpperCase()})</span></div>
          <div className="text-neutral-500">Rank #{detail.market_cap_rank}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Current Price" value={`${symbol}${Number(detail.market_data?.current_price?.[currency]).toLocaleString()}`} />
        <Stat label="Market Cap" value={`${symbol}${formatNumber(detail.market_data?.market_cap?.[currency])}`} />
        <Stat label="24h High" value={`${symbol}${Number(detail.market_data?.high_24h?.[currency]).toLocaleString()}`} />
        <Stat label="24h Low" value={`${symbol}${Number(detail.market_data?.low_24h?.[currency]).toLocaleString()}`} />
      </div>

      <div className="h-80 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <XAxis dataKey="t" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h3>About {detail.name}</h3>
        <div dangerouslySetInnerHTML={{ __html: detail.description?.en?.slice(0, 2000) || 'No description' }} />
      </div>
    </div>
  )
}

function Stat({ label, value }:{ label:string, value:string }){
  return (
    <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
