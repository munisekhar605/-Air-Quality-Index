
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/aqi';

export const fetchAQIData = async (city) => {
  const response = await axios.get(API_BASE_URL, { params: { city } });
  console.log(response.data.data)
  return response.data.data;
};
