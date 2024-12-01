const express = require('express');
const cors = require('cors');
const aqiRoutes = require('./routers/aqi');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/aqi', aqiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
