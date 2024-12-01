const { fetchAQIData } = require('../service/apiService');

const getAQIData = async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }
  try {
    // Fetch data from AQICN API without cache
    const data = await fetchAQIData(city);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
};

module.exports = { getAQIData };
