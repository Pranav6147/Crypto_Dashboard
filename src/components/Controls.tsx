import SearchBar from './SearchBar'

export default function Controls({
  search, setSearch, perPage, setPerPage, order, setOrder
}:{
  search: string, setSearch: (v:string)=>void,
  perPage: number, setPerPage: (n:number)=>void,
  order: string, setOrder: (o:string)=>void
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-4">
      <SearchBar value={search} onChange={setSearch} />
      <div className="flex items-center gap-3">
        <select value={order} onChange={e=>setOrder(e.target.value)} className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <option value="market_cap_desc">Market Cap ↓</option>
          <option value="market_cap_asc">Market Cap ↑</option>
          <option value="volume_desc">Volume ↓</option>
          <option value="volume_asc">Volume ↑</option>
          <option value="price_change_percentage_24h_desc">24h Change ↓</option>
          <option value="price_change_percentage_24h_asc">24h Change ↑</option>
        </select>
        <select value={perPage} onChange={e=>setPerPage(Number(e.target.value))} className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  )
}
