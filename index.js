import express from "express";
import fetch from "node-fetch";

const app = express();
const TINYURL_API_KEY = "FjnI0RLxx2rzWIOlDNbYOgQBMo6FmpBrTDky9KF7AqgT5qqSMsyN9hgzSKtw"; // https://tinyurl.com/app/dev

app.get("/api/shorten", async (req, res) => {
  const longUrl = req.query.url;
  if (!longUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    // Build the exact TinyURL API request body
    const body = {
      url: longUrl,
      domain: "tinyurl.com",
      alias: "",          // No custom alias
      tags: "",           // No tags
      expires_at: "",     // No expiration
      description: ""     // No description
    };

    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TINYURL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json({
      shortUrl: data.data.tiny_url,
      originalUrl: longUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
        
