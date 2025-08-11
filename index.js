import express from "express";
import shortid from "shortid";

const app = express();
const urlMap = {}; // { alias: originalUrl }

app.get("/api/shorten", (req, res) => {
  const originalUrl = req.query.url;
  if (!originalUrl) return res.status(400).json({ error: "Missing URL" });

  const alias = shortid.generate();
  urlMap[alias] = originalUrl;

  res.json({
    shortUrl: `${req.protocol}://${req.get("host")}/${alias}`,
    originalUrl
  });
});

app.get("/:alias", (req, res) => {
  const originalUrl = urlMap[req.params.alias];
  if (!originalUrl) return res.status(404).json({ error: "Not found" });

  res.redirect(originalUrl);
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
        
