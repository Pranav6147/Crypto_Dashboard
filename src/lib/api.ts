import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCurrency } from '../context/CurrencyContext'

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3'
})

export function useCoins({ page, perPage, search, order, sparkline }: 
  { page: number, perPage: number, search: string, order: string, sparkline: boolean }) {
  const { currency } = useCurrency()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    let cancelled = false
    async function run() {
      setLoading(true); setError(null)
      try {
        if (search.trim()) {
          const { data: s } = await api.get('/search', { params: { query: search } })
          const ids = (s.coins || []).slice(0, perPage).map((c: any) => c.id).join(',')
          const { data: markets } = await api.get('/coins/markets', { 
            params: { vs_currency: currency, ids, order, per_page: perPage, page, sparkline, price_change_percentage: '1h,24h,7d' } 
          })
          if (!cancelled) { setData(markets); setTotal((s.coins || []).length) }
        } else {
          const { data: markets } = await api.get('/coins/markets', { 
            params: { vs_currency: currency, order, per_page: perPage, page, sparkline, price_change_percentage: '1h,24h,7d' } 
          })
          if (!cancelled) { 
            setData(markets); 
            setTotal(10000) 
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Failed to fetch')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    const id = setInterval(run, 30000)
    return () => { cancelled = true; clearInterval(id) }
  }, [page, perPage, search, order, sparkline, currency])

  return { data, loading, error, total }
}

export async function fetchCoinDetail(id: string, vs: string) {
  const { data } = await api.get(`/coins/${id}`, { params: { localization: false, sparkline: true } })
  const { data: mkt } = await api.get(`/coins/${id}/market_chart`, { params: { vs_currency: vs, days: 30 } })
  return { detail: data, chart: mkt }
}

export async function fetchGlobal(vs: string) {
  const { data } = await api.get('/global')
  return data
}
