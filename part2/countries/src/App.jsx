import { useState, useEffect } from 'react'
import axios from "axios";
import CountryList from '../components/CountryList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    getAllCountries()
  }, [])

  const getAllCountries = async () => {
    try {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      setCountries(response.data)
    } catch (e) {
      console.error("Error fetching countries", e)
    }
  }

  const handleSearchQuery = (event) => {
    const newQuery = event.target.value
    setSearchQuery(newQuery)
    const updatedCountryList = countries.filter((country) => country.name.common.toLowerCase().includes(newQuery.toLowerCase())) 
    setFilteredCountries(updatedCountryList)
  }

  return (
    <div>
      Find countries <input value={searchQuery} onChange={handleSearchQuery}></input>
      <CountryList countries={filteredCountries} />
    </div>
  )
}

export default App