export const formatNumber = (n: number) => {
  if (n === null || n === undefined) return '-'
  if (Math.abs(n) >= 1e12) return (n/1e12).toFixed(2) + 'T'
  if (Math.abs(n) >= 1e9) return (n/1e9).toFixed(2) + 'B'
  if (Math.abs(n) >= 1e6) return (n/1e6).toFixed(2) + 'M'
  if (Math.abs(n) >= 1e3) return (n/1e3).toFixed(2) + 'K'
  return n.toLocaleString()
}
