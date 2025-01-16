import { useState, useEffect } from "react"
import axios from "axios";
import CountryList from "../components/CountryList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)

  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    getAllCountries()
  }, [])

  const getAllCountries = async () => {
    try {
      const response = await axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      setCountries(response.data)
    } catch (e) {
      console.error("Error fetching countries", e)
    }
  }

  const getCapitalWeather = async (capital) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${WEATHER_API_KEY}&units=metric`)
      setWeatherData(response.data)
      const icon = response.data.weather[0].icon
      setWeatherIcon(`https://openweathermap.org/img/wn/${icon}@2x.png`)
    } catch (e) {
      console.error("Error fetching weather data", e)
    }
  }

  const handleSearchQuery = async (event) => {
    setWeatherData(null)
    setWeatherIcon(null)
    setSelectedCountry(null)
    const newQuery = event.target.value
    setSearchQuery(newQuery)
    const updatedCountryList = countries.filter((c) => c.name.common.toLowerCase().includes(newQuery.toLowerCase())) 
    setFilteredCountries(updatedCountryList)
    // Showing detailed data for country
    if (updatedCountryList.length === 1) {
      getCapitalWeather(updatedCountryList[0].capital)
    }
  }

  const showCountryData = (countryName) => {
    const newSelectedCountry = countries.find((c) => c.name.common === countryName)
    setSelectedCountry(newSelectedCountry)
    getCapitalWeather(newSelectedCountry.capital)
  }

  return (
    <div>
      Find countries <input value={searchQuery} onChange={handleSearchQuery}></input>
      <CountryList 
        countries={filteredCountries} 
        selectedCountry={selectedCountry} 
        weatherData={weatherData}
        weatherIcon={weatherIcon}
        showCountryData={showCountryData} 
      />
    </div>
  )
}

export default App