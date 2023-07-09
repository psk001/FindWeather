import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";

import { OPEN_WEATHER_URL } from "./api";
import { useState } from "react";
const OPEN_WEATHER_API = process.env.OPEN_WEATHER_API_KEY;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    try {
      const [lat, lon] = searchData.value.split(" ");

      const currentWeatherUrl = `${OPEN_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API}&units=metric`;
      const forecastUrl = `${OPEN_WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API}&units=metric`;

      const currentWeatherFetch = fetch(currentWeatherUrl);
      const forecastFetch = fetch(forecastUrl);

      const weatherData = await Promise.all([
        currentWeatherFetch,
        forecastFetch,
      ]);

      const currentWeather = await weatherData[0].json();
      const forecast = await weatherData[1].json();

      setCurrentWeather({ city: searchData.label, ...currentWeather });
      setforecast({ city: searchData.label, ...forecast });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(currentWeather, forecast);

  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
