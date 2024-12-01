const axios = require('axios');
 const API_BASE_URL = `https://api.waqi.info/feed/`;

const API_TOKEN = 'f9cd83ee7a0e12e0df631f4495bfe5bed3adbf6a'; 

const fetchAQIData = async (city) => {
   
  try {
    const response = await axios.get(`${API_BASE_URL}/${city}`, {
      params: { token: API_TOKEN },
    });
    // console.log(response)

    if (response.data.status !== 'ok') {
      throw new Error('City not found');
    }

    const { data } = response;
    return data
  } catch (error) {
    throw new Error(error.response?.data?.data || 'API request failed');
  }
};

module.exports = { fetchAQIData };
