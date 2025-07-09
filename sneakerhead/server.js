import express from 'express';
import cors from 'cors';
import SneaksAPI from 'sneaks-api';
const sneaks = new SneaksAPI();

const app = express();
app.use(cors());

app.get('/api/sneakers', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }
  // server.js
sneaks.getProducts(query, 100, (err, products) => {
  if (err || !products || products.length === 0) {
    return res.status(404).json({ error: 'Sneaker not found' });
  }
  res.json(products); // <-- return the whole array
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Sneaks API proxy server running on http://localhost:${PORT}`);
});


