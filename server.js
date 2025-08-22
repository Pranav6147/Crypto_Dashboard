import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;
const API_BASE = "https://api.coingecko.com/api/v3";

app.use(cors());

// Get top coins (markets)
app.get("/api/coins", async (req, res) => {
  try {
    const { currency = "usd", page = 1, per_page = 20 } = req.query;
    const response = await axios.get(`${API_BASE}/coins/markets`, {
      params: { vs_currency: currency, order: "market_cap_desc", per_page, page, sparkline: true },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coins" });
  }
});

// Get coin details
app.get("/api/coin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_BASE}/coins/${id}`, {
      params: { localization: false, sparkline: true },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coin details" });
  }
});

// Get historical market chart
app.get("/api/coin/:id/history", async (req, res) => {
  try {
    const { id } = req.params;
    const { currency = "usd", days = 30 } = req.query;
    const response = await axios.get(`${API_BASE}/coins/${id}/market_chart`, {
      params: { vs_currency: currency, days },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coin history" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
