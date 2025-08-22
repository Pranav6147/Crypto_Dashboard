# Crypto Dashboard (React + Vite + Tailwind + Recharts)

A feature-rich cryptocurrency dashboard powered by the **CoinGecko API**. Built with **React**, **Vite**, **Tailwind CSS**, **Axios**, and **Recharts**.

## Features
- Real-time markets (auto-refresh every 30s)
- Search coins with instant filtering
- Sort by market cap, volume, or 24h change
- Pagination + configurable page size
- Currency switcher (USD / INR / EUR)
- 7d sparklines & 30d detailed chart
- Coin detail page with key stats & description
- Watchlist (localStorage)
- Dark/Light mode with persistence
- Fully responsive, modern UI

## Getting Started

> Requires Node.js 18+ and npm or pnpm or yarn.

```bash
# install deps
npm install

# start dev server
npm run dev

# build for production
npm run build
npm run preview
```

Open http://localhost:5173 in your browser.

## Project Structure
```
crypto-dashboard/
  src/
    components/   # UI components (Navbar, table, charts)
    context/      # Theme & Currency context
    lib/          # API hooks and utils
    pages/        # Routes: Home, CoinDetail, Watchlist
```

## API
This app uses the public CoinGecko endpoints:
- `/coins/markets`
- `/coins/{id}`
- `/coins/{id}/market_chart`
- `/search`
- `/global`

Refer to: https://www.coingecko.com/en/api/documentation

## Notes
- No API key is required for the CoinGecko public API, but they apply rate limits. If you see 429 errors, wait a bit.
- For production, consider adding caching and a small proxy server to avoid client-side CORS or rate-limit issues.

## Screenshots
(Add your screenshots here after running locally.)
