const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_PATH = './data.json';

// خواندن حافظه
app.get('/memory', (req, res) => {
  const data = fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH)) : {};
  res.json(data);
});

// ذخیره حافظه
app.post('/memory', (req, res) => {
  const data = req.body;
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.json({ status: 'saved' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
