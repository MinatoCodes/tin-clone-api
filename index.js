import express from "express";
import fetch from "node-fetch";

const app = express();

const TINYURL_API_TOKEN = "FjnI0RLxx2rzWIOlDNbYOgQBMo6FmpBrTDky9KF7AqgT5qqSMsyN9hgzSKtw"; // get from https://tinyurl.com/app/dev

app.get("/api/shorten", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TINYURL_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json({
      shortUrl: data.data.tiny_url,
      originalUrl: url
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
      
