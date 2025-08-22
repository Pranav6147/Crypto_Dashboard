import { useState, useEffect } from 'react'

export default function SearchBar({ value, onChange }:{ value: string, onChange: (v:string)=>void }) {
  const [v, setV] = useState(value)
  useEffect(()=>{ setV(value) }, [value])
  return (
    <input
      value={v}
      onChange={(e)=>{ setV(e.target.value); onChange(e.target.value) }}
      placeholder="Search coins (e.g., bitcoin, eth, doge)"
      className="w-full md:w-96 px-4 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
    />
  )
}
