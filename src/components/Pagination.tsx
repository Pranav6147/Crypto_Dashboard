export default function Pagination({ page, setPage }:{ page:number, setPage:(n:number)=>void }){
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button onClick={()=>setPage(p=>Math.max(1, p-1))} className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">Prev</button>
      <span className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">{page}</span>
      <button onClick={()=>setPage(p=>p+1)} className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700">Next</button>
    </div>
  )
}
