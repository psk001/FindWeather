
export const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

export const GEO_API_URL= 'https://wft-geo-db.p.rapidapi.com/v1/geo';
export const OPEN_WEATHER_URL='http://api.openweathermap.org/'

