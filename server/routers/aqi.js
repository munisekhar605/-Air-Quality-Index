const express = require('express');
const { getAQIData } = require('../controllers/apiController');

const router = express.Router();

// GET /api/aqi?city={cityName}
router.get('/', getAQIData);

module.exports = router;
